'use client'

import { activateMap } from '@/app/gm/campaigns/maps/activate'
import { useState } from 'react'

export default function ActivateMapButton({ campaignId, mapId, isActive }: { campaignId: string, mapId: string, isActive: boolean }) {
    const [loading, setLoading] = useState(false)

    const handleActivate = async () => {
        setLoading(true)
        try {
            await activateMap(campaignId, mapId)
        } catch (error) {
            console.error(error)
            alert('Failed to activate map')
        } finally {
            setLoading(false)
        }
    }

    if (isActive) {
        return (
            <button className="btn btn-success" disabled style={{ cursor: 'default', opacity: 1 }}>
                ✅ Active on Table
            </button>
        )
    }

    return (
        <button
            className="btn btn-secondary"
            onClick={handleActivate}
            disabled={loading}
        >
            {loading ? 'Activating...' : '📡 Send to Table'}
        </button>
    )
}
