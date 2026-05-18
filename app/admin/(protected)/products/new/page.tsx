import ProductForm from '@/components/admin/ProductForm';
import { createProduct } from '../actions';

export default function NewProductPage() {
  return (
    <>
      <header className="admin__page-header">
        <div>
          <h1 className="admin__page-title">Novo produto</h1>
          <p className="admin__page-subtitle">Cria uma nova entrada no catálogo.</p>
        </div>
      </header>
      <div className="admin__card" style={{ padding: '1.5rem' }}>
        <ProductForm action={createProduct} />
      </div>
    </>
  );
}
