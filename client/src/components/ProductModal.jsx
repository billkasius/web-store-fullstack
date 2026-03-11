import { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { useLang } from '../contexts/LangContext';

export default function ProductModal({ product, onSave, onClose }) {
  const isEdit = !!product;
  const { t } = useLang();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || '',
        stock: product.stock?.toString() || '',
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name: form.name,
      description: form.description || undefined,
      price: parseFloat(form.price),
      category: form.category || undefined,
      stock: form.stock ? parseInt(form.stock) : 0,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEdit ? t.editProduct : t.newProduct}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>{t.productName}</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t.productNamePlaceholder}
              required
            />
          </div>

          <div className="form-group">
            <label>{t.description}</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder={t.descriptionPlaceholder}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t.priceStar}</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="form-group">
              <label>{t.stockLabel}</label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>{t.categoryLabel}</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder={t.categoryPlaceholder}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              {t.cancel}
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? <><Save size={18} /> {t.save}</> : <><Plus size={18} /> {t.create}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
