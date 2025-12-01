'use client'

import { createCharacter } from '@/app/player/character/actions'
import { useState } from 'react'

export default function CharacterCreationForm({ campaignId }: { campaignId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const [stats, setStats] = useState({
        str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10
    })

    const handleStatChange = (stat: keyof typeof stats, value: string) => {
        const num = parseInt(value) || 0
        setStats(prev => ({ ...prev, [stat]: num }))
    }

    const getMod = (score: number) => Math.floor((score - 10) / 2)
    const formatMod = (mod: number) => mod >= 0 ? `+${mod}` : `${mod}`

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        try {
            await createCharacter(formData)
        } catch (error) {
            console.error(error)
            alert('Failed to create character')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form action={handleSubmit} className="flex flex-col" style={{ gap: '2rem', maxWidth: '800px', width: '100%' }}>
            <input type="hidden" name="campaignId" value={campaignId} />

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                    <label htmlFor="name" style={{ color: 'var(--color-text-muted)' }}>Character Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="glass"
                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }}
                        placeholder="Valeros"
                    />
                </div>
                <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                    <label htmlFor="race" style={{ color: 'var(--color-text-muted)' }}>Race</label>
                    <input
                        id="race"
                        name="race"
                        type="text"
                        required
                        className="glass"
                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }}
                        placeholder="Human"
                    />
                </div>
                <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                    <label htmlFor="class" style={{ color: 'var(--color-text-muted)' }}>Class</label>
                    <input
                        id="class"
                        name="class"
                        type="text"
                        required
                        className="glass"
                        style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }}
                        placeholder="Fighter"
                    />
                </div>
            </div>

            <div className="card glass">
                <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Ability Scores</h3>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
                    {Object.entries(stats).map(([stat, score]) => (
                        <div key={stat} className="flex flex-col items-center" style={{ gap: '0.5rem' }}>
                            <label htmlFor={stat} style={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{stat}</label>
                            <input
                                id={stat}
                                name={stat}
                                type="number"
                                value={score}
                                onChange={(e) => handleStatChange(stat as keyof typeof stats, e.target.value)}
                                className="glass"
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    textAlign: 'center',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'white',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold'
                                }}
                            />
                            <div style={{
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                                color: getMod(score) >= 0 ? 'var(--color-success)' : 'var(--color-error)'
                            }}>
                                {formatMod(getMod(score))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-end', padding: '1rem 3rem', fontSize: '1.1rem' }}
            >
                {isLoading ? 'Forging Hero...' : 'Create Character'}
            </button>
        </form>
    )
}
