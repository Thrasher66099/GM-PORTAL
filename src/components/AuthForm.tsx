'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { login, signup } from '@/app/auth/actions';

export default function AuthForm({ type }: { type: 'login' | 'signup' }) {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const message = searchParams.get('message');

    return (
        <div className="card glass" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                {type === 'login' ? 'Welcome Back' : 'Join the Adventure'}
            </h2>

            {error && (
                <div style={{
                    backgroundColor: 'rgba(220, 38, 38, 0.2)',
                    border: '1px solid rgba(220, 38, 38, 0.5)',
                    color: '#fca5a5',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}

            {message && (
                <div style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    border: '1px solid rgba(16, 185, 129, 0.5)',
                    color: '#6ee7b7',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }}>
                    {message}
                </div>
            )}

            <form className="flex flex-col" style={{ gap: '1rem' }}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="glass"
                    style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="glass"
                    style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', color: 'white', border: '1px solid var(--color-border)' }}
                    required
                />
                <button
                    formAction={type === 'login' ? login : signup}
                    className="btn btn-primary"
                    style={{ marginTop: '1rem' }}
                >
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
