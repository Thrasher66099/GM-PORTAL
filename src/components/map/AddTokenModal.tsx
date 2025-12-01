'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

type Character = {
    id: string
    name: string
    class: string
}

export default function AddTokenModal({ campaignId, onAdd, onClose }: { campaignId: string, onAdd: (character: Character) => void, onClose: () => void }) {
    const [characters, setCharacters] = useState<Character[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCharacters = async () => {
            const supabase = createClient()
            // Fetch characters in this campaign
            const { data } = await supabase
                .from('characters')
                .select('id, name, class')
                .eq('campaign_id', campaignId)

            if (data) setCharacters(data)
            setLoading(false)
        }
        fetchCharacters()
    }, [campaignId])

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
            <div className="card glass" style={{ width: '400px', maxHeight: '80vh', overflowY: 'auto' }}>
                <h3 style={{ marginBottom: '1rem' }}>Add Character Token</h3>

                {loading ? (
                    <p>Loading heroes...</p>
                ) : (
                    <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                        {characters.map(char => (
                            <button
                                key={char.id}
                                className="btn btn-secondary"
                                onClick={() => onAdd(char)}
                                style={{ justifyContent: 'space-between' }}
                            >
                                <span>{char.name}</span>
                                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{char.class}</span>
                            </button>
                        ))}
                        {characters.length === 0 && (
                            <p style={{ color: 'var(--color-text-muted)' }}>No characters found in this campaign.</p>
                        )}
                    </div>
                )}

                <button className="btn" onClick={onClose} style={{ marginTop: '1rem', width: '100%' }}>
                    Cancel
                </button>
            </div>
        </div>
    )
}
