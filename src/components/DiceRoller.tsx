'use client';

import { useState } from 'react';

export default function DiceRoller() {
    const [history, setHistory] = useState<string[]>([]);
    const [result, setResult] = useState<number | null>(null);

    const roll = (sides: number) => {
        const val = Math.floor(Math.random() * sides) + 1;
        setResult(val);
        setHistory(prev => [`d${sides}: ${val}`, ...prev].slice(0, 5));
    };

    return (
        <div className="card glass" style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '300px', zIndex: 50 }}>
            <h3 style={{ marginBottom: '1rem', textAlign: 'center', color: 'var(--color-primary)' }}>Dice Roller</h3>

            <div style={{
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                fontWeight: 'bold',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1rem'
            }}>
                {result ?? '-'}
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {[4, 6, 8, 10, 12, 20, 100].map(d => (
                    <button
                        key={d}
                        className="btn btn-secondary"
                        style={{ padding: '0.5rem', fontSize: '0.9rem' }}
                        onClick={() => roll(d)}
                    >
                        d{d}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '0.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>History</div>
                {history.map((h, i) => (
                    <div key={i} style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{h}</div>
                ))}
            </div>
        </div>
    );
}
