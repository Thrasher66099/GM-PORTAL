'use client'

import { Stage, Layer, Image as KonvaImage, Circle, Line, Rect, Group } from 'react-konva'
import useImage from 'use-image'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import AddTokenModal from './AddTokenModal'
import { updateMapTokens } from '@/app/actions/map'
import { updateMapFog } from '@/app/actions/map-fog'

type Token = {
    id: string
    x: number
    y: number
    color: string
    label: string
    character_id?: string
}

type FogShape = {
    type: 'rect' | 'circle'
    x: number
    y: number
    width?: number
    height?: number
    radius?: number
}

type MapData = {
    id: string
    image_url: string
    grid_data: { size: number, offset: { x: number, y: number } }
    tokens: Token[]
    fog_data?: { revealed: FogShape[] }
}

export default function MapViewer({ mapId, campaignId, initialData, isGM = false, currentUserCharacterId }: { mapId: string, campaignId: string, initialData: MapData, isGM?: boolean, currentUserCharacterId?: string }) {
    const [mapData] = useState<MapData>(initialData)
    const [image] = useImage(mapData.image_url)
    const [tokens, setTokens] = useState<Token[]>(mapData.tokens || [])
    const [fogShapes, setFogShapes] = useState<FogShape[]>(mapData.fog_data?.revealed || [])
    const [scale, setScale] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [activeTool, setActiveTool] = useState<'move' | 'fog-reveal'>('move')

    const supabase = createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stageRef = useRef<any>(null)

    // Sync tokens and fog via Supabase Realtime
    useEffect(() => {
        const channel = supabase
            .channel(`map:${mapId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'maps',
                    filter: `id=eq.${mapId}`
                },
                (payload) => {
                    if (payload.new.tokens) {
                        setTokens(payload.new.tokens as Token[])
                    }
                    if (payload.new.fog_data) {
                        setFogShapes(payload.new.fog_data.revealed || [])
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [mapId, supabase])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleWheel = (e: any) => {
        e.evt.preventDefault()
        const scaleBy = 1.1
        const stage = e.target.getStage()
        const oldScale = stage.scaleX()
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        }

        const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy
        setScale(newScale)
        setPosition({
            x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleStageClick = async (e: any) => {
        if (activeTool === 'fog-reveal' && isGM) {
            const stage = e.target.getStage()
            const pointer = stage.getPointerPosition()
            const x = (pointer.x - stage.x()) / stage.scaleX()
            const y = (pointer.y - stage.y()) / stage.scaleY()

            // Snap to grid for cleaner reveal
            const gridSize = mapData.grid_data.size
            const snappedX = Math.floor(x / gridSize) * gridSize
            const snappedY = Math.floor(y / gridSize) * gridSize

            const newShape: FogShape = {
                type: 'rect',
                x: snappedX,
                y: snappedY,
                width: gridSize,
                height: gridSize
            }

            const newShapes = [...fogShapes, newShape]
            setFogShapes(newShapes)

            // Debounce or just save immediately? Immediate for now.
            await updateMapFog(mapId, { revealed: newShapes })
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTokenDragEnd = async (e: any, tokenId: string) => {
        // Optimistic update
        const newTokenState = tokens.map(t => {
            if (t.id === tokenId) {
                // Snap to grid
                const gridSize = mapData.grid_data.size
                const x = Math.round(e.target.x() / gridSize) * gridSize
                const y = Math.round(e.target.y() / gridSize) * gridSize
                return { ...t, x, y }
            }
            return t
        })

        setTokens(newTokenState)

        // Save to DB via Server Action
        try {
            await updateMapTokens(mapId, newTokenState)
        } catch (error) {
            console.error('Failed to move token:', error)
        }
    }

    // Render Grid
    const renderGrid = () => {
        if (!image) return null
        const gridSize = mapData.grid_data.size
        const width = image.width
        const height = image.height
        const lines = []

        for (let i = 0; i < width / gridSize; i++) {
            lines.push(
                <Line
                    key={`v-${i}`}
                    points={[i * gridSize, 0, i * gridSize, height]}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth={1}
                />
            )
        }
        for (let j = 0; j < height / gridSize; j++) {
            lines.push(
                <Line
                    key={`h-${j}`}
                    points={[0, j * gridSize, width, j * gridSize]}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth={1}
                />
            )
        }
        return lines
    }

    const [showTokenModal, setShowTokenModal] = useState(false)

    return (
        <div className="card glass" style={{ padding: 0, overflow: 'hidden', height: '600px', position: 'relative' }}>
            <Stage
                width={800} // Should be dynamic
                height={600}
                onWheel={handleWheel}
                onClick={handleStageClick}
                onTap={handleStageClick}
                scaleX={scale}
                scaleY={scale}
                x={position.x}
                y={position.y}
                draggable={activeTool === 'move'}
                ref={stageRef}
            >
                <Layer>
                    {image && <KonvaImage image={image} />}
                    {renderGrid()}
                </Layer>

                {/* Fog Layer */}
                <Layer>
                    <Group>
                        {/* The Fog Overlay (Black) */}
                        {/* We use a giant rect that covers everything, then 'erase' parts of it */}
                        {/* Note: Konva doesn't support 'masking' easily with composite operations on a single layer 
                            without some tricks. A simpler way for MVP:
                            Draw a giant black rect.
                            Then draw 'erasing' shapes with globalCompositeOperation = 'destination-out'
                        */}
                        {image && (
                            <>
                                <Rect
                                    x={0}
                                    y={0}
                                    width={image.width}
                                    height={image.height}
                                    fill="black"
                                    opacity={isGM ? 0.5 : 1} // GM sees through fog partially
                                    listening={false}
                                />
                                {fogShapes.map((shape, i) => (
                                    shape.type === 'rect' ? (
                                        <Rect
                                            key={i}
                                            x={shape.x}
                                            y={shape.y}
                                            width={shape.width}
                                            height={shape.height}
                                            fill="white"
                                            globalCompositeOperation="destination-out"
                                            listening={false}
                                        />
                                    ) : (
                                        <Circle
                                            key={i}
                                            x={shape.x}
                                            y={shape.y}
                                            radius={shape.radius}
                                            fill="white"
                                            globalCompositeOperation="destination-out"
                                            listening={false}
                                        />
                                    )
                                ))}
                            </>
                        )}
                    </Group>
                </Layer>

                <Layer>
                    {tokens.map(token => (
                        <Circle
                            key={token.id}
                            x={token.x}
                            y={token.y}
                            radius={mapData.grid_data.size / 2 - 2}
                            fill={token.color}
                            draggable={activeTool === 'move' && (isGM || (!!token.character_id && token.character_id === currentUserCharacterId))}
                            onDragEnd={(e) => handleTokenDragEnd(e, token.id)}
                            shadowColor="black"
                            shadowBlur={5}
                            shadowOpacity={0.5}
                        />
                    ))}
                </Layer>
            </Stage>

            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', padding: '0.5rem', borderRadius: '4px' }}>
                <small style={{ color: 'white' }}>Scroll to Zoom • {activeTool === 'move' ? 'Drag to Pan' : 'Click to Reveal'}</small>
            </div>

            {isGM && (
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div className="btn-group vertical" style={{ background: 'var(--color-surface)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
                        <button
                            className={`btn btn-sm ${activeTool === 'move' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setActiveTool('move')}
                            title="Move / Pan"
                        >
                            ✋
                        </button>
                        <button
                            className={`btn btn-sm ${activeTool === 'fog-reveal' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setActiveTool('fog-reveal')}
                            title="Reveal Fog"
                        >
                            🔦
                        </button>
                    </div>
                </div>
            )}

            {isGM && activeTool === 'move' && (
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button
                        className="btn btn-secondary"
                        onClick={async () => {
                            const newToken: Token = {
                                id: crypto.randomUUID(),
                                x: 100,
                                y: 100,
                                color: 'red',
                                label: 'Enemy'
                            }
                            const newTokens = [...tokens, newToken]
                            setTokens(newTokens)
                            await supabase.from('maps').update({ tokens: newTokens }).eq('id', mapId)
                        }}
                    >
                        + Add Enemy
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowTokenModal(true)}
                    >
                        + Add Player
                    </button>
                </div>
            )}

            {showTokenModal && (
                <AddTokenModal
                    campaignId={campaignId}
                    onAdd={async (char) => {
                        const newToken: Token = {
                            id: crypto.randomUUID(),
                            x: 150,
                            y: 150,
                            color: 'blue', // Could be dynamic based on class
                            label: char.name,
                            character_id: char.id
                        }
                        const newTokens = [...tokens, newToken]
                        setTokens(newTokens)
                        await supabase.from('maps').update({ tokens: newTokens }).eq('id', mapId)
                        setShowTokenModal(false)
                    }}
                    onClose={() => setShowTokenModal(false)}
                />
            )}
        </div>
    )
}
