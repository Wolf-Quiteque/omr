'use client';

import { useTransition } from 'react';

type Props = {
  confirmText: string;
  action: () => Promise<void>;
};

export default function DeleteButton({ confirmText, action }: Props) {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(confirmText)) return;
    startTransition(async () => {
      await action();
    });
  }

  return (
    <button
      type="button"
      className="admin__btn admin__btn--danger"
      onClick={handleClick}
      disabled={pending}
    >
      {pending ? 'A apagar…' : 'Apagar'}
    </button>
  );
}
