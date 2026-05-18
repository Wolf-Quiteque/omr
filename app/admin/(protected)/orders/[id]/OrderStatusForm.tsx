'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateOrderStatus } from '../actions';
import type { OrderStatus } from '@/lib/supabase/types';

const OPTIONS: OrderStatus[] = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export default function OrderStatusForm({
  id,
  status,
}: {
  id: string;
  status: OrderStatus;
}) {
  const router = useRouter();
  const [current, setCurrent] = useState<OrderStatus>(status);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as OrderStatus;
    setCurrent(next);
    setError(null);
    startTransition(async () => {
      const res = await updateOrderStatus(id, next);
      if (res?.error) {
        setError(res.error);
        setCurrent(status);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
      <select
        className="admin__select"
        value={current}
        onChange={onChange}
        disabled={pending}
      >
        {OPTIONS.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <span style={{ fontSize: '0.75rem', color: '#b91c1c' }}>{error}</span>}
    </div>
  );
}
