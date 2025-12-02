'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type InventoryItem = {
    id: string
    name: string
    quantity: number
    description?: string
}

export async function addItem(characterId: string, item: Omit<InventoryItem, 'id'>) {
    const supabase = await createClient()

    // Get current inventory
    const { data: character } = await supabase
        .from('characters')
        .select('inventory')
        .eq('id', characterId)
        .single()

    if (!character) throw new Error('Character not found')

    const currentInventory = (character.inventory as InventoryItem[]) || []

    // Add new item
    const newItem: InventoryItem = {
        ...item,
        id: crypto.randomUUID()
    }

    const newInventory = [...currentInventory, newItem]

    const { error } = await supabase
        .from('characters')
        .update({ inventory: newInventory })
        .eq('id', characterId)

    if (error) throw new Error('Failed to add item')

    revalidatePath(`/player/character/${characterId}`)
}

export async function removeItem(characterId: string, itemId: string) {
    const supabase = await createClient()

    const { data: character } = await supabase
        .from('characters')
        .select('inventory')
        .eq('id', characterId)
        .single()

    if (!character) throw new Error('Character not found')

    const currentInventory = (character.inventory as InventoryItem[]) || []
    const newInventory = currentInventory.filter(item => item.id !== itemId)

    const { error } = await supabase
        .from('characters')
        .update({ inventory: newInventory })
        .eq('id', characterId)

    if (error) throw new Error('Failed to remove item')

    revalidatePath(`/player/character/${characterId}`)
}

export async function updateItemQuantity(characterId: string, itemId: string, change: number) {
    const supabase = await createClient()

    const { data: character } = await supabase
        .from('characters')
        .select('inventory')
        .eq('id', characterId)
        .single()

    if (!character) throw new Error('Character not found')

    const currentInventory = (character.inventory as InventoryItem[]) || []
    const newInventory = currentInventory.map(item => {
        if (item.id === itemId) {
            return { ...item, quantity: Math.max(0, item.quantity + change) }
        }
        return item
    }).filter(item => item.quantity > 0) // Remove if quantity becomes 0? Or keep it? Let's keep it unless explicitly removed, but maybe 0 is fine. Actually, let's allow 0.

    const { error } = await supabase
        .from('characters')
        .update({ inventory: newInventory })
        .eq('id', characterId)

    if (error) throw new Error('Failed to update item')

    revalidatePath(`/player/character/${characterId}`)
}
