import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

// Dynamically import MapViewer to avoid SSR issues with Canvas
const MapViewer = dynamic(() => import('@/components/map/MapViewer'), { ssr: false })

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
            <h1 style={{ marginBottom: '1rem' }}>{map.name}</h1>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <MapViewer mapId={mapId} initialData={map as any} isGM={true} />
        </div>
    )
}
