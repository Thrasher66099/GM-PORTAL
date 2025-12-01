'use client'

import { createMap } from '@/app/gm/campaigns/maps/actions'
import { useState } from 'react'

export default function CreateMapForm({ campaignId }: { campaignId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const [mode, setMode] = useState<'upload' | 'generate'>('upload')
    const [imageUrl, setImageUrl] = useState('')

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        try {
            // If using generated image, we need to append it to formData or handle it
            if (imageUrl) {
                formData.set('imageUrl', imageUrl)
            }
            await createMap(formData)
        } catch (error) {
            console.error(error)
            alert('Failed to create map')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGenerateStub = () => {
        setIsLoading(true)
        // Simulate AI generation delay
        setTimeout(() => {
            setImageUrl('https://placehold.co/800x600/1a1b26/FFF?text=Generated+Dungeon+Map')
            setIsLoading(false)
        }, 2000)
    }

    return (
        <form action={handleSubmit} className="flex flex-col" style={{ gap: '1.5rem', maxWidth: '600px', width: '100%' }}>
            <input type="hidden" name="campaignId" value={campaignId} />

            <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                <label htmlFor="name" style={{ color: 'var(--color-text-muted)' }}>Map Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="glass"
                    style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }}
                    placeholder="Goblin Ambush Site"
                />
            </div>

            <div className="card glass" style={{ padding: '0' }}>
                <div className="flex border-b border-white/10">
                    <button
                        type="button"
                        onClick={() => setMode('upload')}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            background: mode === 'upload' ? 'rgba(255,255,255,0.1)' : 'transparent',
                            color: mode === 'upload' ? 'white' : 'var(--color-text-muted)',
                            fontWeight: 'bold'
                        }}
                    >
                        Upload Image
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('generate')}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            background: mode === 'generate' ? 'rgba(255,255,255,0.1)' : 'transparent',
                            color: mode === 'generate' ? 'white' : 'var(--color-text-muted)',
                            fontWeight: 'bold'
                        }}
                    >
                        AI Generate
                    </button>
                </div>

                <div style={{ padding: '1.5rem' }}>
                    {mode === 'upload' ? (
                        <div className="flex flex-col" style={{ gap: '1rem' }}>
                            <label style={{ color: 'var(--color-text-muted)' }}>Image URL</label>
                            <input
                                name="imageUrl"
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="glass"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }}
                                placeholder="https://example.com/map.jpg"
                                required={mode === 'upload'}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                * For now, please provide a direct URL to an image. File upload coming soon.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col" style={{ gap: '1rem' }}>
                            <label style={{ color: 'var(--color-text-muted)' }}>Prompt</label>
                            <textarea
                                className="glass"
                                rows={3}
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }}
                                placeholder="A damp cavern with glowing mushrooms and a small stream..."
                            />
                            <button
                                type="button"
                                onClick={handleGenerateStub}
                                disabled={isLoading}
                                className="btn btn-secondary"
                            >
                                {isLoading ? 'Generating...' : 'Generate Map (Stub)'}
                            </button>
                        </div>
                    )}

                    {imageUrl && (
                        <div style={{ marginTop: '1rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imageUrl} alt="Map Preview" style={{ width: '100%', display: 'block' }} />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                <label htmlFor="gridSize" style={{ color: 'var(--color-text-muted)' }}>Grid Size (px)</label>
                <input
                    id="gridSize"
                    name="gridSize"
                    type="number"
                    defaultValue={50}
                    className="glass"
                    style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }}
                />
            </div>

            <button
                type="submit"
                disabled={isLoading || !imageUrl}
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
            >
                {isLoading ? 'Saving...' : 'Create Map'}
            </button>
        </form>
    )
}
