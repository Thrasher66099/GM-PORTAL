'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateMapFog(mapId: string, fogData: any) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('maps')
        .update({ fog_data: fogData })
        .eq('id', mapId)

    if (error) {
        console.error('Error updating map fog:', error)
        throw new Error('Failed to update map fog')
    }

    // We don't strictly need to revalidate path if we rely on realtime, 
    // but it's good practice for initial loads.
    // revalidatePath(...) 
}
