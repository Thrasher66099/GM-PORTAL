import Link from 'next/link';

export default function GMLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex full-height">
            <aside style={{ width: '250px', borderRight: '1px solid var(--color-border)', background: 'var(--color-surface)', padding: '1rem' }}>
                <div style={{ marginBottom: '2rem', fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
                    GM Nexus
                </div>
                <nav className="flex flex-col" style={{ gap: '0.5rem' }}>
                    <Link href="/gm" className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none', color: 'var(--color-text)' }}>Dashboard</Link>
                    <Link href="/gm/campaigns" className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none', color: 'var(--color-text)' }}>Campaigns</Link>
                    <Link href="/gm/assets" className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none', color: 'var(--color-text)' }}>Asset Studio</Link>
                    <Link href="/gm/settings" className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none', color: 'var(--color-text)' }}>Settings</Link>
                </nav>
            </aside>
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    );
}
