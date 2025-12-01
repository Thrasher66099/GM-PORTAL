import CreateMapForm from '@/components/map/CreateMapForm'

export default async function NewMapPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return (
        <div className="container flex flex-col items-center" style={{ paddingBottom: '4rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Create New Map</h1>
            <CreateMapForm campaignId={id} />
        </div>
    )
}
