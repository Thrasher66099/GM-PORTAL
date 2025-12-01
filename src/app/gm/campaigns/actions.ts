'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createCampaign(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('Not authenticated')
    }

    // Ensure user has a profile
    // In a real app, this should be handled by a database trigger on auth.users insert
    // But for now we'll do a quick check/insert if missing
    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

    if (!profile) {
        await supabase.from('profiles').insert({
            id: user.id,
            email: user.email,
            role: 'gm' // Default to GM for now if creating a campaign
        })
    }

    const title = formData.get('title') as string
    const system = formData.get('system') as string
    const description = formData.get('description') as string

    const { data, error } = await supabase
        .from('campaigns')
        .insert({
            gm_id: user.id,
            title,
            system,
            description,
            invite_code: Math.random().toString(36).substring(2, 8).toUpperCase()
        })
        .select()
        .single()

    if (error) {
        console.error('Error creating campaign:', error)
        throw new Error('Failed to create campaign')
    }

    revalidatePath('/gm/campaigns')
    redirect(`/gm/campaigns/${data.id}`)
}
