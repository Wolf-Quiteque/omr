'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { ProductRow, ProductCategory } from '@/lib/supabase/types';

type Props = {
  initial?: ProductRow;
  action: (formData: FormData) => Promise<{ error?: string } | void>;
};

const CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'parfum', label: 'Eau de Parfum' },
  { value: 'oil', label: 'Óleo Perfumado' },
  { value: 'candle', label: 'Vela' },
  { value: 'accessory', label: 'Acessório' },
];

export default function ProductForm({ initial, action }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [uploading, setUploading] = useState(false);

  async function uploadFile(file: File) {
    setUploading(true);
    try {
      const res = await fetch('/api/admin/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Falha a pedir URL de upload.');
      }
      const { uploadUrl, publicUrl } = await res.json();

      const put = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });
      if (!put.ok) throw new Error('Falha no upload para o R2.');

      setImages((prev) => [...prev, publicUrl]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Falha no upload.');
    } finally {
      setUploading(false);
    }
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    setError(null);
    for (const file of Array.from(files)) {
      await uploadFile(file);
    }
    e.target.value = '';
  }

  function removeImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.set('images', images.join('\n'));
    startTransition(async () => {
      const result = await action(formData);
      if (result && 'error' in result && result.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form className="admin__form" onSubmit={onSubmit}>
      {error && <div className="admin__error">{error}</div>}

      <div className="admin__form-grid-2">
        <div className="admin__field">
          <label className="admin__label" htmlFor="name">Nome</label>
          <input id="name" name="name" required className="admin__input" defaultValue={initial?.name} />
        </div>
        <div className="admin__field">
          <label className="admin__label" htmlFor="slug">Slug (URL)</label>
          <input
            id="slug"
            name="slug"
            required
            pattern="[a-z0-9-]+"
            className="admin__input"
            defaultValue={initial?.slug}
          />
          <span className="admin__hint">Minúsculas, dígitos e hífens. Ex: intro-oil</span>
        </div>
      </div>

      <div className="admin__form-grid-2">
        <div className="admin__field">
          <label className="admin__label" htmlFor="tagline">Descrição curta</label>
          <input
            id="tagline"
            name="tagline"
            required
            className="admin__input"
            defaultValue={initial?.tagline}
            placeholder="Eau de Parfum — 50ml"
          />
        </div>
        <div className="admin__field">
          <label className="admin__label" htmlFor="price_kz">Preço (Kz)</label>
          <input
            id="price_kz"
            name="price_kz"
            type="number"
            min="0"
            step="1"
            required
            className="admin__input"
            defaultValue={initial?.price_kz}
          />
          <span className="admin__hint">Valor em Kwanzas, sem casas decimais.</span>
        </div>
      </div>

      <div className="admin__form-grid-2">
        <div className="admin__field">
          <label className="admin__label" htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            className="admin__select"
            defaultValue={initial?.category ?? 'parfum'}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="admin__field">
          <label className="admin__label" htmlFor="featured_order">Ordem em destaque</label>
          <input
            id="featured_order"
            name="featured_order"
            type="number"
            min="0"
            className="admin__input"
            defaultValue={initial?.featured_order ?? ''}
          />
          <span className="admin__hint">Vazio = não aparece em destaque. Menor = primeiro.</span>
        </div>
      </div>

      <div className="admin__field">
        <label className="admin__label" htmlFor="description">Descrição (um parágrafo por linha)</label>
        <textarea
          id="description"
          name="description"
          className="admin__textarea"
          rows={5}
          defaultValue={(initial?.description ?? []).join('\n')}
        />
      </div>

      <div className="admin__field">
        <label className="admin__label" htmlFor="specs">Especificações (uma por linha)</label>
        <textarea
          id="specs"
          name="specs"
          className="admin__textarea"
          rows={5}
          defaultValue={(initial?.specs ?? []).join('\n')}
        />
      </div>

      <div className="admin__field">
        <label className="admin__label" htmlFor="ritual">Uso ritual</label>
        <textarea
          id="ritual"
          name="ritual"
          className="admin__textarea"
          rows={3}
          defaultValue={initial?.ritual}
        />
      </div>

      <div className="admin__field">
        <label className="admin__label">Imagens</label>
        <span className="admin__hint">
          Novas imagens são enviadas directamente para o R2. As imagens da loja original
          (em /assets/images) continuam a funcionar.
        </span>
        <div className="admin__image-grid" style={{ marginTop: '0.5rem' }}>
          {images.map((url, idx) => (
            <div className="admin__image-tile" key={`${url}-${idx}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Imagem ${idx + 1}`} />
              <button type="button" onClick={() => removeImage(idx)} aria-label="Remover">
                Remover
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onUpload}
          disabled={uploading}
          style={{ marginTop: '0.5rem' }}
        />
        {uploading && <span className="admin__hint">A enviar…</span>}
      </div>

      <div className="admin__field" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
        <input
          id="in_stock"
          name="in_stock"
          type="checkbox"
          defaultChecked={initial?.in_stock ?? true}
        />
        <label htmlFor="in_stock" className="admin__label" style={{ marginBottom: 0 }}>
          Em stock
        </label>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button
          type="submit"
          className="admin__btn admin__btn--primary"
          disabled={pending || uploading}
        >
          {pending ? 'A guardar…' : initial ? 'Guardar alterações' : 'Criar produto'}
        </button>
        <button
          type="button"
          className="admin__btn"
          onClick={() => router.push('/admin/products')}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
