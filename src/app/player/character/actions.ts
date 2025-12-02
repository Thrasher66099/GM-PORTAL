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

    // Fetch campaign ruleset to parse stats dynamically
    const { data: campaign } = await supabase
        .from('campaigns')
        .select('ruleset_config')
        .eq('id', campaignId)
        .single()

    // Default to 5e if no ruleset
    const defaultStats = [
        { key: 'str' }, { key: 'dex' }, { key: 'con' },
        { key: 'int' }, { key: 'wis' }, { key: 'cha' }
    ]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const statConfig = (campaign?.ruleset_config as any)?.stats || defaultStats
    const stats: Record<string, number> = {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    statConfig.forEach((stat: any) => {
        stats[stat.key] = parseInt(formData.get(stat.key) as string) || 10
    })

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
