'use client'

import { createCampaign } from '@/app/gm/campaigns/actions'
import { useState } from 'react'

export default function CreateCampaignForm() {
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        try {
            await createCampaign(formData)
        } catch (error) {
            console.error(error)
            alert('Failed to create campaign')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form action={handleSubmit} className="flex flex-col" style={{ gap: '1.5rem', maxWidth: '500px' }}>
            <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                <label htmlFor="title" style={{ color: 'var(--color-text-muted)' }}>Campaign Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className="glass"
                    style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }}
                    placeholder="The Curse of Strahd"
                />
            </div>

            <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                <label htmlFor="system" style={{ color: 'var(--color-text-muted)' }}>Game System</label>
                <select
                    id="system"
                    name="system"
                    className="glass"
                    style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)', backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <option value="5e">D&D 5th Edition</option>
                    <option value="pf2e">Pathfinder 2e</option>
                    <option value="coc">Call of Cthulhu</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                <label htmlFor="description" style={{ color: 'var(--color-text-muted)' }}>Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="glass"
                    style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }}
                    placeholder="A gothic horror adventure..."
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
            >
                {isLoading ? 'Creating...' : 'Create Campaign'}
            </button>
        </form>
    )
}
