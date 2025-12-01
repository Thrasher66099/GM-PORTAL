'use client';

import { useState } from 'react';

export default function AssetStudioPage() {
    const [prompt, setPrompt] = useState('');
    const [style, setStyle] = useState('dark-fantasy');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate generation
        setTimeout(() => setIsGenerating(false), 2000);
    };

    return (
        <div className="flex flex-col" style={{ gap: '2rem' }}>
            <h1>Asset Studio</h1>

            <div className="card">
                <div className="flex flex-col" style={{ gap: '1rem' }}>
                    <label>
                        <strong>Item Description</strong>
                        <textarea
                            className="glass"
                            style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', color: 'white', minHeight: '100px', borderRadius: 'var(--radius-md)' }}
                            placeholder="A glowing sword with a ruby hilt..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                    </label>

                    <div className="flex" style={{ gap: '1rem' }}>
                        <label style={{ flex: 1 }}>
                            <strong>Art Style</strong>
                            <select
                                className="glass"
                                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', color: 'white', borderRadius: 'var(--radius-md)' }}
                                value={style}
                                onChange={(e) => setStyle(e.target.value)}
                            >
                                <option value="dark-fantasy">Dark Fantasy Oil</option>
                                <option value="watercolor">Watercolor Sketch</option>
                                <option value="pixel">Pixel Art</option>
                                <option value="realistic">Photorealistic</option>
                            </select>
                        </label>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%' }}
                                onClick={handleGenerate}
                                disabled={isGenerating}
                            >
                                {isGenerating ? 'Dreaming...' : 'Generate Asset'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                {/* Placeholders for generated images */}
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="card" style={{ aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                        <span style={{ color: '#333' }}>Asset {i}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
