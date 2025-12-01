'use client';

import { useState } from 'react';

export default function CharacterSheetPage() {
    const [stats, setStats] = useState({
        str: 16, dex: 14, con: 15, int: 10, wis: 12, cha: 8
    });

    const getMod = (score: number) => Math.floor((score - 10) / 2);
    const formatMod = (mod: number) => mod >= 0 ? `+${mod}` : `${mod}`;

    return (
        <div className="flex flex-col" style={{ gap: '2rem' }}>
            <div className="flex justify-between items-end">
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>Valeros</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Level 5 Human Fighter</p>
                </div>
                <button className="btn btn-secondary">Edit Stats</button>
            </div>

            {/* Main Stats */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
                {Object.entries(stats).map(([stat, score]) => (
                    <div key={stat} className="card" style={{ padding: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>{stat}</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{score}</div>
                        <div style={{
                            background: 'var(--color-surface-light)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            color: getMod(score) >= 0 ? 'var(--color-success)' : 'var(--color-error)'
                        }}>
                            {formatMod(getMod(score))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Combat Stats */}
                <div className="card">
                    <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Combat</h3>
                    <div className="flex justify-between" style={{ textAlign: 'center' }}>
                        <div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>AC</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>18</div>
                        </div>
                        <div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Initiative</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>+2</div>
                        </div>
                        <div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Speed</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>30ft</div>
                        </div>
                        <div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Proficiency</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>+3</div>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>Attacks</h4>
                        <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                            <div className="flex justify-between items-center" style={{ background: 'var(--color-surface-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                                <span style={{ fontWeight: 'bold' }}>Longsword</span>
                                <span>+6 to hit</span>
                                <span>1d8 + 3 slashing</span>
                            </div>
                            <div className="flex justify-between items-center" style={{ background: 'var(--color-surface-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                                <span style={{ fontWeight: 'bold' }}>Javelin</span>
                                <span>+5 to hit</span>
                                <span>1d6 + 3 piercing</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills / Saves */}
                <div className="card">
                    <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Skills</h3>
                    <div className="flex flex-col" style={{ gap: '0.5rem', fontSize: '0.9rem' }}>
                        <div className="flex justify-between"><span>Athletics (Str)</span><span>+6</span></div>
                        <div className="flex justify-between"><span>Acrobatics (Dex)</span><span>+2</span></div>
                        <div className="flex justify-between"><span>Stealth (Dex)</span><span>+2</span></div>
                        <div className="flex justify-between"><span>Perception (Wis)</span><span>+4</span></div>
                        <div className="flex justify-between"><span>Survival (Wis)</span><span>+4</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
