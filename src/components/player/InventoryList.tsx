'use client'

import { useState } from 'react'
import { addItem, removeItem, updateItemQuantity, InventoryItem } from '@/app/player/character/inventory-actions'

export default function InventoryList({ characterId, initialInventory }: { characterId: string, initialInventory: InventoryItem[] }) {
    const [isAdding, setIsAdding] = useState(false)
    const [newItemName, setNewItemName] = useState('')
    const [newItemDesc, setNewItemDesc] = useState('')
    const [newItemQty, setNewItemQty] = useState(1)

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newItemName) return

        await addItem(characterId, {
            name: newItemName,
            description: newItemDesc,
            quantity: newItemQty
        })

        setNewItemName('')
        setNewItemDesc('')
        setNewItemQty(1)
        setIsAdding(false)
    }

    return (
        <div className="flex flex-col" style={{ gap: '1rem' }}>
            <div className="flex justify-between items-center">
                <h4 style={{ color: 'var(--color-text)' }}>Inventory</h4>
                <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => setIsAdding(!isAdding)}
                >
                    {isAdding ? 'Cancel' : '+ Add Item'}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAdd} className="card glass" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input
                        type="text"
                        placeholder="Item Name"
                        className="input"
                        value={newItemName}
                        onChange={e => setNewItemName(e.target.value)}
                        autoFocus
                    />
                    <input
                        type="text"
                        placeholder="Description (optional)"
                        className="input"
                        value={newItemDesc}
                        onChange={e => setNewItemDesc(e.target.value)}
                    />
                    <div className="flex items-center" style={{ gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Qty:</label>
                        <input
                            type="number"
                            min="1"
                            className="input"
                            style={{ width: '60px' }}
                            value={newItemQty}
                            onChange={e => setNewItemQty(parseInt(e.target.value))}
                        />
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Add</button>
                    </div>
                </form>
            )}

            <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                {initialInventory.length === 0 && !isAdding && (
                    <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>Empty backpack.</p>
                )}

                {initialInventory.map(item => (
                    <div key={item.id} className="flex justify-between items-center" style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-sm)'
                    }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                            {item.description && <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.description}</div>}
                        </div>

                        <div className="flex items-center" style={{ gap: '0.5rem' }}>
                            <button
                                className="btn-icon"
                                onClick={() => updateItemQuantity(characterId, item.id, -1)}
                                style={{ padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.1)' }}
                            >
                                -
                            </button>
                            <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                            <button
                                className="btn-icon"
                                onClick={() => updateItemQuantity(characterId, item.id, 1)}
                                style={{ padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.1)' }}
                            >
                                +
                            </button>
                            <button
                                className="btn-icon"
                                onClick={() => removeItem(characterId, item.id)}
                                style={{ marginLeft: '0.5rem', color: 'var(--color-error)', opacity: 0.7 }}
                                title="Remove"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
