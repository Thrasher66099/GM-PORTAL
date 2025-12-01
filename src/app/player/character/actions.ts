'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createCharacter(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('Not authenticated')
    }

    const campaignId = formData.get('campaignId') as string
    const name = formData.get('name') as string
    const race = formData.get('race') as string
    const characterClass = formData.get('class') as string

    // Parse stats
    const stats = {
        str: parseInt(formData.get('str') as string) || 10,
        dex: parseInt(formData.get('dex') as string) || 10,
        con: parseInt(formData.get('con') as string) || 10,
        int: parseInt(formData.get('int') as string) || 10,
        wis: parseInt(formData.get('wis') as string) || 10,
        cha: parseInt(formData.get('cha') as string) || 10,
    }

    // Create character
    const { data: character, error: createError } = await supabase
        .from('characters')
        .insert({
            player_id: user.id,
            campaign_id: campaignId,
            name,
            race,
            class: characterClass,
            stats,
            level: 1,
            inventory: []
        })
        .select()
        .single()

    if (createError) {
        console.error('Error creating character:', createError)
        throw new Error('Failed to create character')
    }

    // Link character to campaign membership
    const { error: linkError } = await supabase
        .from('campaign_members')
        .update({ character_id: character.id })
        .eq('campaign_id', campaignId)
        .eq('player_id', user.id)

    if (linkError) {
        console.error('Error linking character:', linkError)
        // We don't throw here to avoid blocking the user, but we log it
    }

    revalidatePath(`/player/campaign/${campaignId}`)
    redirect(`/player/campaign/${campaignId}`)
}
