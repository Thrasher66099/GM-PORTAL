import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function CharacterSheetPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()
    const { id } = await params

    // Fetch character and campaign ruleset
    const { data: character } = await supabase
        .from('characters')
        .select('*, campaigns(ruleset_config)')
        .eq('id', id)
        .single()

    if (!character) {
        notFound()
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ruleset = (character.campaigns as any)?.ruleset_config

    // Default config if none exists
    const statConfig = ruleset?.stats || [
        { key: 'str', label: 'Strength' },
        { key: 'dex', label: 'Dexterity' },
        { key: 'con', label: 'Constitution' },
        { key: 'int', label: 'Intelligence' },
        { key: 'wis', label: 'Wisdom' },
        { key: 'cha', label: 'Charisma' }
    ]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stats = character.stats as Record<string, number>

    const getMod = (score: number) => Math.floor((score - 10) / 2)
    const formatMod = (mod: number) => mod >= 0 ? `+${mod}` : `${mod}`

    return (
        <div className="container flex flex-col" style={{ gap: '2rem', paddingBottom: '4rem' }}>
            <div className="flex justify-between items-end">
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>{character.name}</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Level {character.level} {character.race} {character.class}</p>
                </div>
                <div className="flex gap-2">
                    <Link href={`/player/campaign/${character.campaign_id}`} className="btn btn-secondary">
                        Back to Dashboard
                    </Link>
                    <button className="btn btn-primary">Edit Stats</button>
                </div>
            </div>

            {/* Main Stats */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem' }}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {statConfig.map((stat: any) => {
                    const score = stats[stat.key] || 10
                    const mod = getMod(score)
                    return (
                        <div key={stat.key} className="card glass" style={{ padding: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>{stat.label}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{score}</div>
                            <div style={{
                                background: 'rgba(255,255,255,0.1)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '999px',
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                                color: mod >= 0 ? 'var(--color-success)' : 'var(--color-error)'
                            }}>
                                {formatMod(mod)}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Combat Stats */}
                <div className="card glass">
                    <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Combat</h3>
                    <div className="flex justify-between" style={{ textAlign: 'center' }}>
                        <div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>AC</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>
                                {10 + getMod(stats['dex'] || 10)}
                            </div>
                        </div>
                        <div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Initiative</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                {formatMod(getMod(stats['dex'] || 10))}
                            </div>
                        </div>
                        <div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Speed</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>30ft</div>
                        </div>
                        <div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Proficiency</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                +{Math.ceil(1 + (character.level || 1) / 4)}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>Attacks</h4>
                        <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                            <div className="flex justify-between items-center" style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                                <span style={{ fontWeight: 'bold' }}>Unarmed Strike</span>
                                <span>{formatMod(getMod(stats['str'] || 10))} to hit</span>
                                <span>1 + {getMod(stats['str'] || 10)} bludgeoning</span>
                            </div>
                        </div>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                            (Inventory system coming soon)
                        </p>
                    </div>
                </div>

                {/* Skills / Saves */}
                <div className="card glass">
                    <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Skills</h3>
                    <div className="flex flex-col" style={{ gap: '0.5rem', fontSize: '0.9rem' }}>
                        {/* Placeholder skills - in a real app these would be dynamic too */}
                        <div className="flex justify-between"><span>Athletics (Str)</span><span>{formatMod(getMod(stats['str'] || 10))}</span></div>
                        <div className="flex justify-between"><span>Acrobatics (Dex)</span><span>{formatMod(getMod(stats['dex'] || 10))}</span></div>
                        <div className="flex justify-between"><span>Stealth (Dex)</span><span>{formatMod(getMod(stats['dex'] || 10))}</span></div>
                        <div className="flex justify-between"><span>Perception (Wis)</span><span>{formatMod(getMod(stats['wis'] || 10))}</span></div>
                        <div className="flex justify-between"><span>Survival (Wis)</span><span>{formatMod(getMod(stats['wis'] || 10))}</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
