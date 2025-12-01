import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center full-height" style={{ background: 'radial-gradient(circle at center, #1a1b26 0%, #050505 100%)' }}>
            <AuthForm type="login" />
        </div>
    );
}
