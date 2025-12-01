'use client'

import dynamic from 'next/dynamic'

// Dynamically import MapViewer to avoid SSR issues with Canvas
const MapViewer = dynamic(() => import('./MapViewer'), { ssr: false })

// Define the props type to match MapViewer
type Token = {
    id: string
    x: number
    y: number
    color: string
    label: string
    character_id?: string
}

type MapData = {
    id: string
    image_url: string
    grid_data: { size: number, offset: { x: number, y: number } }
    tokens: Token[]
}

type MapViewerProps = {
    mapId: string
    campaignId: string
    initialData: MapData
    isGM?: boolean
    currentUserCharacterId?: string
}

export default function MapViewerWrapper(props: MapViewerProps) {
    return <MapViewer {...props} />
}
