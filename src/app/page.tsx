import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="full-height">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center full-height" style={{
        background: 'radial-gradient(circle at center, #1a1b26 0%, #050505 100%)',
        textAlign: 'center',
        paddingTop: '80px' // Offset for fixed navbar
      }}>
        <div className="container">
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            Forge Your <span className="text-gradient">Legend</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            The ultimate AI-powered companion for Game Masters and Players.
            Generate worlds, visualize items, and manage your campaign with unprecedented ease.
          </p>
          <div className="flex justify-center" style={{ gap: '1rem' }}>
            <Link href="/signup" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
              Start Your Campaign
            </Link>
            <Link href="#demo" className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '5rem 0', background: 'var(--color-bg)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
            Empower Your Table
          </h2>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <FeatureCard
              title="AI World Building"
              description="Generate lore, NPCs, and plot hooks instantly with our advanced LLM integration."
              icon="🧠"
            />
            <FeatureCard
              title="Visual Asset Studio"
              description="Create stunning item art and scene visualizations that match your campaign's unique style."
              icon="🎨"
            />
            <FeatureCard
              title="Interactive Maps"
              description="Real-time dungeon crawling with dynamic fog of war and token management."
              icon="🗺️"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: string }) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>{title}</h3>
      <p style={{ color: 'var(--color-text-muted)' }}>{description}</p>
    </div>
  );
}
