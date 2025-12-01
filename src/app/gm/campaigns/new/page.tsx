import CreateCampaignForm from '@/components/campaign/CreateCampaignForm'

export default function NewCampaignPage() {
    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>Create New Campaign</h1>
            <div className="card glass">
                <CreateCampaignForm />
            </div>
        </div>
    )
}
