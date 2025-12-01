import Link from 'next/link';
import DiceRoller from '@/components/DiceRoller';

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex full-height">
            <aside style={{ width: '250px', borderRight: '1px solid var(--color-border)', background: 'var(--color-surface)', padding: '1rem' }}>
                <div style={{ marginBottom: '2rem', fontSize: '1.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-secondary-light)' }}>
                    Player Nexus
                </div>
                <nav className="flex flex-col" style={{ gap: '0.5rem' }}>
                    <Link href="/player" className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none', color: 'var(--color-text)' }}>Dashboard</Link>
                    <Link href="/player/character" className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none', color: 'var(--color-text)' }}>Character Sheet</Link>
                    <Link href="/player/journal" className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none', color: 'var(--color-text)' }}>Journal</Link>
                    <Link href="/player/map" className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none', color: 'var(--color-text)' }}>Map</Link>
                    <Link href="/player/loot" className="btn btn-secondary" style={{ justifyContent: 'flex-start', border: 'none', color: 'var(--color-text)' }}>Loot Bag</Link>
                </nav>
            </aside>
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                {children}
            </main>
            <DiceRoller />
        </div>
    );
}
