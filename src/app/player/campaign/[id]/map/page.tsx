import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import MapViewerWrapper from '@/components/map/MapViewerWrapper'

export default async function PlayerMapPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()
    const { id } = await params

    // Fetch the active map for this campaign
    const { data: map } = await supabase
        .from('maps')
        .select('*')
        .eq('campaign_id', id)
        .eq('is_active', true)
        .single()

    if (!map) {
        return (
            <div className="container flex flex-col items-center justify-center" style={{ minHeight: '60vh' }}>
                <div className="card glass" style={{ padding: '3rem', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '1rem' }}>No Active Map</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                        The Game Master hasn't placed a map on the table yet.
                    </p>
                    <Link href={`/player/campaign/${id}`} className="btn btn-secondary">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    // Fetch the user's character for this campaign
    const { data: { user } } = await supabase.auth.getUser()
    let characterId = undefined

    if (user) {
        const { data: character } = await supabase
            .from('characters')
            .select('id')
            .eq('campaign_id', id)
            .eq('player_id', user.id)
            .single()

        if (character) {
            characterId = character.id
        }
    }

    return (
        <div className="container">
            <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
                <h1>{map.name}</h1>
                <Link href={`/player/campaign/${id}`} className="btn btn-secondary">
                    Back to Dashboard
                </Link>
            </div>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <MapViewerWrapper mapId={map.id} campaignId={id} initialData={map as any} isGM={false} currentUserCharacterId={characterId} />
        </div>
    )
}
