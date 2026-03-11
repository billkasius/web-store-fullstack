import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Pencil, Trash2, Search, Package,
  LayoutDashboard, ShoppingBag, DollarSign, Boxes
} from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import { useLang } from '../contexts/LangContext';
import ProductModal from '../components/ProductModal';

export default function AdminPage() {
  const { t } = useLang();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState({ open: false, product: null });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getProducts(search ? { search } : {});
      setProducts(data);
    } catch {
      toast.error(t.errorLoadingProducts);
    } finally {
      setLoading(false);
    }
  }, [search, t.errorLoadingProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSave = async (data) => {
    try {
      if (modal.product) {
        await api.updateProduct(modal.product.id, data);
        toast.success(t.productUpdated);
      } else {
        await api.createProduct(data);
        toast.success(t.productCreated);
      }
      setModal({ open: false, product: null });
      fetchProducts();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteProduct(id);
      toast.success(t.productDeleted);
      setDeleteConfirm(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const stats = {
    total: products.length,
    totalValue: products.reduce((s, p) => s + p.price * p.stock, 0).toFixed(0),
    categories: [...new Set(products.map((p) => p.category).filter(Boolean))].length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  };

  return (
    <div className="admin-page fade-in-up">
      <div className="admin-header">
        <div className="admin-title">
          <LayoutDashboard size={28} />
          <div>
            <h1>{t.adminPanel}</h1>
            <p>{t.adminSubtitle}</p>
          </div>
        </div>
        <button
          className="btn btn-primary btn-glow"
          onClick={() => setModal({ open: true, product: null })}
        >
          <Plus size={18} />
          {t.addProduct}
        </button>
      </div>

      <div className="admin-stats">
        {[
          { icon: ShoppingBag, color: '#a78bfa', bg: 'rgba(139, 92, 246, 0.15)', value: stats.total, label: t.totalProducts },
          { icon: DollarSign, color: '#4ade80', bg: 'rgba(34, 197, 94, 0.15)', value: `$${stats.totalValue}`, label: t.warehouseValue },
          { icon: Boxes, color: '#60a5fa', bg: 'rgba(59, 130, 246, 0.15)', value: stats.categories, label: t.categoriesCount },
          { icon: Package, color: '#fb923c', bg: 'rgba(251, 146, 60, 0.15)', value: stats.outOfStock, label: t.outOfStockCount },
        ].map(({ icon: Icon, color, bg, value, label }, i) => (
          <div className="admin-stat-card stat-animate" key={label} style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="admin-stat-icon" style={{ background: bg }}>
              <Icon size={22} style={{ color }} />
            </div>
            <div>
              <span className="admin-stat-value">{value}</span>
              <span className="admin-stat-label">{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={18} />
          <input
            type="text"
            placeholder={t.searchProducts}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>{t.loading}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state fade-in-up">
          <Package size={64} strokeWidth={1} />
          <h3>{t.noProducts}</h3>
          <p>{t.addFirstProduct}</p>
          <button
            className="btn btn-primary"
            onClick={() => setModal({ open: true, product: null })}
          >
            <Plus size={18} /> {t.addProduct}
          </button>
        </div>
      ) : (
        <div className="admin-table-wrapper table-animate">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t.id}</th>
                <th>{t.name}</th>
                <th>{t.category}</th>
                <th>{t.price}</th>
                <th>{t.stock}</th>
                <th>{t.date}</th>
                <th>{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.id} className="row-animate" style={{ animationDelay: `${i * 0.04}s` }}>
                  <td className="td-id">#{p.id}</td>
                  <td className="td-name">
                    <strong>{p.name}</strong>
                    {p.description && (
                      <span className="td-desc">{p.description}</span>
                    )}
                  </td>
                  <td>
                    {p.category ? (
                      <span className="table-category">{p.category}</span>
                    ) : (
                      <span className="td-empty">—</span>
                    )}
                  </td>
                  <td className="td-price">${p.price}</td>
                  <td>
                    <span className={`stock-badge ${p.stock > 0 ? 'in' : 'out'}`}>
                      {p.stock} {t.pcs}
                    </span>
                  </td>
                  <td className="td-date">{p.created_at?.split(' ')[0]}</td>
                  <td className="td-actions">
                    <button
                      className="action-btn edit"
                      onClick={() => setModal({ open: true, product: p })}
                    >
                      <Pencil size={16} />
                    </button>
                    {deleteConfirm === p.id ? (
                      <div className="delete-confirm">
                        <button
                          className="action-btn delete-yes"
                          onClick={() => handleDelete(p.id)}
                        >
                          {t.yes}
                        </button>
                        <button
                          className="action-btn delete-no"
                          onClick={() => setDeleteConfirm(null)}
                        >
                          {t.no}
                        </button>
                      </div>
                    ) : (
                      <button
                        className="action-btn delete"
                        onClick={() => setDeleteConfirm(p.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal.open && (
        <ProductModal
          product={modal.product}
          onSave={handleSave}
          onClose={() => setModal({ open: false, product: null })}
        />
      )}
    </div>
  );
}
