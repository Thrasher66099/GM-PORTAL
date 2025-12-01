'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

type Token = {
    id: string
    x: number
    y: number
    color: string
    label: string
    character_id?: string
}

export async function updateMapTokens(mapId: string, tokens: Token[]) {
    const supabase = await createClient()

    // In a real app, we should validate that the user has permission to move the specific token
    // For now, we'll rely on the client to only allow dragging owned tokens, 
    // and here we just check if the user is a member of the campaign.

    // 1. Get map to find campaign_id
    const { data: map } = await supabase.from('maps').select('campaign_id').eq('id', mapId).single()
    if (!map) throw new Error('Map not found')

    // 2. Verify membership (GM or Player)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data: member } = await supabase
        .from('campaign_members')
        .select('role')
        .eq('campaign_id', map.campaign_id)
        .eq('profile_id', user.id)
        .single()

    if (!member) throw new Error('Not a member of this campaign')

    // 3. Update tokens
    // Note: This replaces the entire token array. Race conditions are possible but acceptable for MVP.
    const { error } = await supabase
        .from('maps')
        .update({ tokens })
        .eq('id', mapId)

    if (error) throw error

    // No revalidatePath needed usually for realtime, but good practice
}
