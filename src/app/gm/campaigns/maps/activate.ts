'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function activateMap(campaignId: string, mapId: string) {
    const supabase = await createClient()

    // 1. Deactivate all other maps for this campaign
    await supabase
        .from('maps')
        .update({ is_active: false })
        .eq('campaign_id', campaignId)

    // 2. Activate the selected map
    const { error } = await supabase
        .from('maps')
        .update({ is_active: true })
        .eq('id', mapId)

    if (error) {
        console.error('Error activating map:', error)
        throw new Error('Failed to activate map')
    }

    revalidatePath(`/gm/campaigns/${campaignId}`)
    revalidatePath(`/player/campaign/${campaignId}`)
}
