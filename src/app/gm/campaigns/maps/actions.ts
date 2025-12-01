'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createMap(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('Not authenticated')
    }

    const campaignId = formData.get('campaignId') as string
    const name = formData.get('name') as string
    const imageUrl = formData.get('imageUrl') as string
    const gridSize = parseInt(formData.get('gridSize') as string) || 50

    const { data, error } = await supabase
        .from('maps')
        .insert({
            campaign_id: campaignId,
            name,
            image_url: imageUrl,
            grid_data: { size: gridSize, offset: { x: 0, y: 0 } },
            fog_data: {},
            tokens: [],
            is_active: false
        })
        .select()
        .single()

    if (error) {
        console.error('Error creating map:', error)
        throw new Error('Failed to create map')
    }

    revalidatePath(`/gm/campaigns/${campaignId}`)
    redirect(`/gm/campaigns/${campaignId}`)
}
