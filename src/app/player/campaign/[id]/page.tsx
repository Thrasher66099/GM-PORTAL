import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import DiceRoller from '@/components/DiceRoller'
import GameLog from '@/components/GameLog'

export default async function PlayerCampaignDashboard({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()
    const { id } = await params
    const { data: { user } } = await supabase.auth.getUser()

    // Get campaign details
    const { data: campaign } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single()

    if (!campaign) {
        notFound()
    }

    // Get membership and character
    const { data: membership } = await supabase
        .from('campaign_members')
        .select('*, characters(*)')
        .eq('campaign_id', id)
        .eq('player_id', user?.id)
        .single()

    if (!membership) {
        redirect('/player') // Not a member
    }

    const character = membership.characters

    if (!character) {
        redirect(`/player/campaign/${id}/create-character`)
    }

    return (
        <div className="container">
            <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>{campaign.title}</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Playing as <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{character.name}</span></p>
                </div>
                <div className="flex" style={{ gap: '1rem' }}>
                    <Link href={`/player/character/${character.id}`} className="btn btn-secondary">
                        Character Sheet
                    </Link>
                    <button className="btn btn-primary">Open Map</button>
                </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Main Content Area (Map placeholder for now) */}
                <div className="card glass" style={{ minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ color: 'var(--color-text-muted)' }}>Map View Coming Soon</p>
                </div>


                {/* Sidebar (Chat/Log) */}
                <div className="flex flex-col" style={{ gap: '1rem' }}>
                    <div className="card glass" style={{ flex: 1, minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>Session Log</h3>
                        <GameLog />
                    </div>
                </div>
            </div>

            <DiceRoller />
        </div>
    )
}
