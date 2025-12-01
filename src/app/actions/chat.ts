'use server'

import { createClient } from '@/lib/supabase/server'

export async function sendChatMessage(campaignId: string, message: string) {
    const supabase = await createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Get user profile to get username
    const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

    if (!profile) throw new Error('Profile not found')

    // Insert message into game_logs
    const { error } = await supabase
        .from('game_logs')
        .insert({
            campaign_id: campaignId,
            sender_id: user.id,
            type: 'chat',
            content: { message: message }
        })

    if (error) {
        console.error('Error sending chat message:', error)
        throw new Error('Failed to send message')
    }
}
