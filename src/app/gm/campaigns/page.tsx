import CreateCampaignForm from '@/components/campaign/CreateCampaignForm'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function CampaignsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: campaigns } = await supabase
        .from('campaigns')
        .select('*')
        .eq('gm_id', user?.id)
        .order('created_at', { ascending: false })

    return (
        <div className="container">
            <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
                <h1>Your Campaigns</h1>
                <Link href="/gm/campaigns/new" className="btn btn-primary">
                    + New Campaign
                </Link>
            </div>

            {campaigns && campaigns.length > 0 ? (
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                    {campaigns.map((campaign) => (
                        <Link
                            key={campaign.id}
                            href={`/gm/campaigns/${campaign.id}`}
                            className="card glass"
                            style={{
                                textDecoration: 'none',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                        >
                            <h3 style={{ marginBottom: '0.5rem' }}>{campaign.title}</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                <span style={{
                                    fontSize: '0.8rem',
                                    padding: '0.25rem 0.5rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '4px'
                                }}>
                                    {campaign.system}
                                </span>
                            </div>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {campaign.description || 'No description provided.'}
                            </p>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="card glass" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>No Campaigns Yet</h3>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                        Start your journey by creating your first campaign.
                    </p>
                    <Link href="/gm/campaigns/new" className="btn btn-primary">
                        Create Campaign
                    </Link>
                </div>
            )}
        </div>
    )
}
