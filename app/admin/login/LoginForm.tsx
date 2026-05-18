'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get('next') || '/admin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { data, error: signInErr } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInErr || !data.user) {
      setError(signInErr?.message || 'Não foi possível iniciar sessão.');
      setLoading(false);
      return;
    }

    const role = (data.user.app_metadata as { role?: string })?.role;
    if (role !== 'admin') {
      await supabase.auth.signOut();
      setError('Esta conta não tem permissões de administrador.');
      setLoading(false);
      return;
    }

    router.replace(next);
    router.refresh();
  }

  return (
    <form className="admin__form" onSubmit={onSubmit}>
      {error && <div className="admin__error">{error}</div>}
      <div className="admin__field">
        <label className="admin__label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="admin__input"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="admin__field">
        <label className="admin__label" htmlFor="password">
          Palavra-passe
        </label>
        <input
          id="password"
          type="password"
          className="admin__input"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="admin__btn admin__btn--primary" disabled={loading}>
        {loading ? 'A entrar…' : 'Entrar'}
      </button>
    </form>
  );
}
