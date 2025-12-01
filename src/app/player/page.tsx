import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function PlayerDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: memberships } = await supabase
        .from('campaign_members')
        .select(`
            campaign_id,
            campaigns (
                id,
                title,
                system,
                description
            )
        `)
        .eq('player_id', user?.id)

    return (
        <div className="container">
            <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
                <h1>Your Adventures</h1>
                <Link href="/player/join" className="btn btn-primary">
                    Join Campaign
                </Link>
            </div>

            {memberships && memberships.length > 0 ? (
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                    {memberships.map((m: any) => (
                        <Link
                            key={m.campaign_id}
                            href={`/player/campaign/${m.campaign_id}`}
                            className="card glass"
                            style={{
                                textDecoration: 'none',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                        >
                            <h3 style={{ marginBottom: '0.5rem' }}>{m.campaigns.title}</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                <span style={{
                                    fontSize: '0.8rem',
                                    padding: '0.25rem 0.5rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '4px'
                                }}>
                                    {m.campaigns.system}
                                </span>
                            </div>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {m.campaigns.description || 'No description provided.'}
                            </p>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="card glass" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>No Active Campaigns</h3>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                        You haven&apos;t joined any campaigns yet.
                    </p>
                    <Link href="/player/join" className="btn btn-primary">
                        Join a Campaign
                    </Link>
                </div>
            )}
        </div>
    )
}
