export default function SettingsPage() {
    return (
        <div className="flex flex-col" style={{ gap: '2rem', maxWidth: '800px' }}>
            <h1>Settings</h1>

            <div className="card">
                <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Profile</h3>
                <div className="grid" style={{ gap: '1rem' }}>
                    <div className="flex flex-col">
                        <label style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>Display Name</label>
                        <input type="text" defaultValue="DungeonMaster99" className="glass" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div className="flex flex-col">
                        <label style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email</label>
                        <input type="email" defaultValue="dm@example.com" className="glass" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }} />
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Subscription</h3>
                <div className="flex justify-between items-center">
                    <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>Gold Tier</div>
                        <p style={{ color: 'var(--color-text-muted)' }}>Next billing date: Dec 24, 2025</p>
                    </div>
                    <button className="btn btn-secondary">Manage Subscription</button>
                </div>
            </div>

            <div className="card">
                <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Preferences</h3>
                <div className="flex flex-col" style={{ gap: '1rem' }}>
                    <div className="flex justify-between items-center">
                        <span>Dark Mode</span>
                        <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Email Notifications</span>
                        <input type="checkbox" defaultChecked />
                    </div>
                </div>
            </div>
        </div>
    );
}
