import AuthForm from '@/components/AuthForm';
import { Suspense } from 'react';

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center full-height" style={{ background: 'radial-gradient(circle at center, #1a1b26 0%, #050505 100%)' }}>
            <Suspense fallback={<div className="text-white">Loading...</div>}>
                <AuthForm type="login" />
            </Suspense>
        </div>
    );
}
