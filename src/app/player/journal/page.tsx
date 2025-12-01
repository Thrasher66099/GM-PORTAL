export default function JournalPage() {
    return (
        <div className="flex flex-col" style={{ gap: '2rem' }}>
            <div className="flex justify-between items-center">
                <h1>Journal</h1>
                <button className="btn btn-primary">+ New Entry</button>
            </div>

            <div className="grid" style={{ gap: '1rem' }}>
                <div className="card">
                    <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                        <h3 style={{ color: 'var(--color-primary)' }}>Meeting the Baron</h3>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Day 45</span>
                    </div>
                    <p style={{ lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                        We finally arrived at the keep. The Baron seems suspicious, he kept looking at the rogue.
                        He offered us 500gp to clear out the cellar. Sounds too good to be true.
                    </p>
                </div>

                <div className="card">
                    <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                        <h3 style={{ color: 'var(--color-primary)' }}>The Goblin Ambush</h3>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Day 42</span>
                    </div>
                    <p style={{ lineHeight: '1.6', color: 'var(--color-text-muted)' }}>
                        Barely made it out alive. Need to buy more potions next time we are in town.
                        Found a strange ring with a skull on it.
                    </p>
                </div>
            </div>
        </div>
    );
}
