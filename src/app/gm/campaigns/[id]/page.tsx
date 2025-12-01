import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function CampaignDashboard({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()

    // Await params before using them
    const { id } = await params

    const { data: campaign } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single()

    if (!campaign) {
        notFound()
    }

    return (
        <div className="container">
            <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>{campaign.title}</h1>
                    <div className="flex items-center" style={{ gap: '1rem', color: 'var(--color-text-muted)' }}>
                        <span>System: {campaign.system}</span>
                        <span>•</span>
                        <span>Invite Code: <code style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px', color: 'var(--color-primary)' }}>{campaign.invite_code}</code></span>
                    </div>
                </div>
                <div className="flex" style={{ gap: '1rem' }}>
                    <button className="btn btn-secondary">Settings</button>
                    <button className="btn btn-primary">Launch Session</button>
                </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Quick Actions */}
                <div className="card glass">
                    <h3>Quick Actions</h3>
                    <div className="flex flex-col" style={{ gap: '1rem' }}>
                        <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                            🗺️ Create New Map
                        </button>
                        <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                            👤 Generate NPC
                        </button>
                        <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                            ⚔️ Create Item
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="card glass">
                    <h3>Recent Activity</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                        No recent activity recorded.
                    </p>
                </div>

                {/* Players */}
                <div className="card glass">
                    <h3>Players (0)</h3>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                        No players have joined yet. Share the invite code!
                    </p>
                    <button className="btn btn-secondary" style={{ width: '100%' }}>
                        Manage Players
                    </button>
                </div>
            </div>
        </div>
    )
}
