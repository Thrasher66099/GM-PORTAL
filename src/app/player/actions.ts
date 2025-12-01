'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function joinCampaign(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('Not authenticated')
    }

    // Ensure user has a profile (Player role)
    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

    if (!profile) {
        await supabase.from('profiles').insert({
            id: user.id,
            email: user.email,
            role: 'player'
        })
    }

    const inviteCode = formData.get('inviteCode') as string

    // Find campaign by invite code
    const { data: campaign, error: campaignError } = await supabase
        .from('campaigns')
        .select('id')
        .eq('invite_code', inviteCode.toUpperCase())
        .single()

    if (campaignError || !campaign) {
        return { error: 'Invalid invite code' }
    }

    // Check if already a member
    const { data: existingMember } = await supabase
        .from('campaign_members')
        .select('id')
        .eq('campaign_id', campaign.id)
        .eq('player_id', user.id)
        .single()

    if (existingMember) {
        return { error: 'You are already in this campaign' }
    }

    // Join campaign
    const { error: joinError } = await supabase
        .from('campaign_members')
        .insert({
            campaign_id: campaign.id,
            player_id: user.id
        })

    if (joinError) {
        console.error('Error joining campaign:', joinError)
        return { error: 'Failed to join campaign' }
    }

    revalidatePath('/player')
    redirect('/player')
}
