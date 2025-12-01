export default function GMDashboard() {
    return (
        <div>
            <h1>Welcome, Game Master</h1>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <div className="card">
                    <h3>Active Campaigns</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>3</p>
                </div>
                <div className="card">
                    <h3>Generated Assets</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-secondary-light)' }}>124</p>
                </div>
                <div className="card">
                    <h3>Next Session</h3>
                    <p style={{ fontSize: '1.2rem' }}>Tomorrow, 7:00 PM</p>
                </div>
            </div>
        </div>
    );
}
