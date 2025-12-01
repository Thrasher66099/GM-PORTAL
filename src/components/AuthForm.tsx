'use client';

import Link from 'next/link';

export default function AuthForm({ type }: { type: 'login' | 'signup' }) {
    return (
        <div className="card glass" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                {type === 'login' ? 'Welcome Back' : 'Join the Adventure'}
            </h2>
            <form className="flex flex-col" style={{ gap: '1rem' }}>
                <input
                    type="email"
                    placeholder="Email"
                    className="glass"
                    style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="glass"
                    style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }}
                />
                <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    {type === 'login' ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                {type === 'login' ? (
                    <>Don't have an account? <Link href="/signup" style={{ color: 'var(--color-primary)' }}>Sign Up</Link></>
                ) : (
                    <>Already have an account? <Link href="/login" style={{ color: 'var(--color-primary)' }}>Login</Link></>
                )}
            </div>
        </div>
    );
}
