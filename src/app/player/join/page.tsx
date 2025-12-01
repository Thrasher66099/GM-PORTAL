import JoinCampaignForm from '@/components/player/JoinCampaignForm'

export default function JoinPage() {
    return (
        <div className="container flex flex-col items-center justify-center" style={{ minHeight: '60vh' }}>
            <h1 style={{ marginBottom: '2rem' }}>Join a Campaign</h1>
            <div className="card glass" style={{ padding: '3rem', width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', textAlign: 'center' }}>
                    Enter the 6-character invite code provided by your Game Master.
                </p>
                <JoinCampaignForm />
            </div>
        </div>
    )
}
