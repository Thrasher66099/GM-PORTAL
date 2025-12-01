import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '1rem 0' }}>
            <div className="container flex items-center justify-between">
                <Link href="/" style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                    Tabletop Nexus
                </Link>

                <div className="flex items-center" style={{ gap: '2rem' }}>
                    <Link href="#features" className="nav-link">Features</Link>
                    <Link href="#pricing" className="nav-link">Pricing</Link>
                    <div className="flex" style={{ gap: '1rem' }}>
                        <Link href="/login" className="btn btn-secondary">Login</Link>
                        <Link href="/signup" className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
