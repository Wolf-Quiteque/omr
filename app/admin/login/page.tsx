import { Suspense } from 'react';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Entrar — Admin OMR',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <p className="admin-login__title">Admin OMR</p>
        <p className="admin-login__subtitle">Inicia sessão para gerir o catálogo.</p>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
