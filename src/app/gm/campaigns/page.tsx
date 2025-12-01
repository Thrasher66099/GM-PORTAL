'use client';

import { useState } from 'react';

// Mock Data
const initialCampaigns = [
    { id: 1, name: "The Curse of Strahd", system: "5E", players: 4, nextSession: "2023-11-25" },
    { id: 2, name: "Cyberpunk: Night City", system: "Cyberpunk Red", players: 3, nextSession: "2023-11-28" },
];

export default function CampaignsPage() {
    const [campaigns] = useState(initialCampaigns);

    return (
        <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                <h1>My Campaigns</h1>
                <button className="btn btn-primary">
                    + New Campaign
                </button>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {campaigns.map(campaign => (
                    <div key={campaign.id} className="card">
                        <h3 style={{ color: 'var(--color-primary)' }}>{campaign.name}</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{campaign.system}</p>
                        <div className="flex justify-between" style={{ fontSize: '0.9rem' }}>
                            <span>{campaign.players} Players</span>
                            <span>Next: {campaign.nextSession}</span>
                        </div>
                        <div className="flex" style={{ marginTop: '1.5rem', gap: '0.5rem' }}>
                            <button className="btn btn-secondary" style={{ flex: 1 }}>Launch</button>
                            <button className="btn btn-secondary" style={{ flex: 1 }}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
