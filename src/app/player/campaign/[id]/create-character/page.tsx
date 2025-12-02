import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import CharacterCreationForm from '@/components/player/CharacterCreationForm'

export default async function CreateCharacterPage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient()
    const { id } = await params

    const { data: campaign } = await supabase
        .from('campaigns')
        .select('ruleset_config')
        .eq('id', id)
        .single()

    if (!campaign) notFound()

    return (
        <div className="container flex flex-col items-center" style={{ paddingBottom: '4rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Create Your Character</h1>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <CharacterCreationForm campaignId={id} rulesetConfig={campaign.ruleset_config as any} />
        </div>
    )
}
