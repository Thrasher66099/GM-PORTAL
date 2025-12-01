export default function LootPage() {
    return (
        <div className="flex flex-col" style={{ gap: '2rem' }}>
            <h1>Loot Bag</h1>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {/* Item 1 */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ height: '200px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '3rem' }}>🗡️</span>
                    </div>
                    <div style={{ padding: '1rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Vorpal Sword</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Legendary Longsword</p>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ height: '200px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '3rem' }}>🧪</span>
                    </div>
                    <div style={{ padding: '1rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Potion of Healing</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Common Potion (x3)</p>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ height: '200px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '3rem' }}>💍</span>
                    </div>
                    <div style={{ padding: '1rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Ring of Protection</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Rare Ring</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
