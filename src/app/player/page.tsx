export default function PlayerDashboard() {
    return (
        <div>
            <h1>Welcome, Adventurer</h1>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <div className="card">
                    <h3>Current Character</h3>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>Valeros (Lvl 5)</p>
                    <p style={{ color: 'var(--color-text-muted)' }}>Human Fighter</p>
                </div>
                <div className="card">
                    <h3>HP</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>45 / 52</p>
                </div>
                <div className="card">
                    <h3>Gold</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#eab308' }}>1,240 gp</p>
                </div>
            </div>
        </div>
    );
}
