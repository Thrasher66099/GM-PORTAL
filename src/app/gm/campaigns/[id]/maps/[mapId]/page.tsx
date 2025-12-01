import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ActivateMapButton from '@/components/map/ActivateMapButton'
import MapViewerWrapper from '@/components/map/MapViewerWrapper'

export default async function MapPage({ params }: { params: Promise<{ id: string, mapId: string }> }) {
    const supabase = await createClient()
    const { id, mapId } = await params

    const { data: map } = await supabase
        .from('maps')
        .select('*')
        .eq('id', mapId)
        .eq('campaign_id', id)
        .single()

    if (!map) {
        notFound()
    }

    return (
        <div className="container">
            <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
                <h1>{map.name}</h1>
                <ActivateMapButton campaignId={id} mapId={mapId} isActive={map.is_active} />
            </div>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <MapViewerWrapper mapId={mapId} campaignId={id} initialData={map as any} isGM={true} />
        </div>
    )
}
