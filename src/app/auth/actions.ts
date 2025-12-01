'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    console.log('Login action started')
    const supabase = await createClient()

    // Type-casting here for simplicity, but in a real app you should validate inputs
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    console.log('Attempting login for:', email)

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Login error:', error)
        redirect('/login?error=Could not authenticate user: ' + error.message)
    }

    revalidatePath('/', 'layout')
    redirect('/gm') // Default redirect to GM portal for now
}

export async function signup(formData: FormData) {
    console.log('Signup action started')
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    console.log('Attempting signup for:', email)

    const { error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        console.error('Signup error:', error)
        redirect('/signup?error=Could not create user: ' + error.message)
    }

    revalidatePath('/', 'layout')
    redirect('/signup?message=Check email to continue sign in process')
}
