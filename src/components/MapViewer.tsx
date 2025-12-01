'use client';

export default function MapViewer() {
    return (
        <div className="card" style={{ height: '100%', position: 'relative', overflow: 'auto', background: '#222', padding: 0 }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(20, 50px)',
                gridTemplateRows: 'repeat(20, 50px)',
                gap: '1px',
                background: '#333',
                width: 'fit-content'
            }}>
                {Array.from({ length: 400 }).map((_, i) => (
                    <div key={i} style={{ background: '#1a1b26', width: '50px', height: '50px' }} />
                ))}
            </div>

            {/* Token */}
            <div style={{
                position: 'absolute',
                top: '105px',
                left: '105px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                border: '2px solid white',
                boxShadow: '0 0 10px var(--color-primary-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'black'
            }}>
                V
            </div>
        </div>
    );
}
