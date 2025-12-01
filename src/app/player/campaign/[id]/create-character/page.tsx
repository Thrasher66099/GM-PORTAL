import CharacterCreationForm from '@/components/player/CharacterCreationForm'

export default async function CreateCharacterPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return (
        <div className="container flex flex-col items-center" style={{ paddingBottom: '4rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Create Your Character</h1>
            <CharacterCreationForm campaignId={id} />
        </div>
    )
}
