'use client'

import { joinCampaign } from '@/app/player/actions'
import { useState } from 'react'

export default function JoinCampaignForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setError(null)
        try {
            const result = await joinCampaign(formData)
            if (result && result.error) {
                setError(result.error)
            }
        } catch (e) {
            console.error(e)
            setError('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form action={handleSubmit} className="flex flex-col" style={{ gap: '1.5rem', maxWidth: '400px', width: '100%' }}>
            {error && (
                <div style={{
                    background: 'rgba(220, 38, 38, 0.2)',
                    border: '1px solid rgba(220, 38, 38, 0.5)',
                    color: '#fca5a5',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}

            <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                <label htmlFor="inviteCode" style={{ color: 'var(--color-text-muted)' }}>Invite Code</label>
                <input
                    id="inviteCode"
                    name="inviteCode"
                    type="text"
                    required
                    className="glass"
                    style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        color: 'white',
                        border: '1px solid var(--color-border)',
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        letterSpacing: '0.2rem',
                        textTransform: 'uppercase'
                    }}
                    placeholder="XYZ123"
                    maxLength={6}
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
                style={{ marginTop: '0.5rem' }}
            >
                {isLoading ? 'Joining...' : 'Join Campaign'}
            </button>
        </form>
    )
}
