import { useState, useEffect, useCallback } from 'react';
import {
  Plus, Pencil, Trash2, Search, Package,
  LayoutDashboard, ShoppingBag, DollarSign, Boxes
} from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import ProductModal from '../components/ProductModal';

export default function AdminPage() {
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
      toast.error('Ошибка загрузки товаров');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSave = async (data) => {
    try {
      if (modal.product) {
        await api.updateProduct(modal.product.id, data);
        toast.success('Товар обновлён');
      } else {
        await api.createProduct(data);
        toast.success('Товар создан');
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
      toast.success('Товар удалён');
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
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-title">
          <LayoutDashboard size={28} />
          <div>
            <h1>Панель управления</h1>
            <p>Управление товарами TomaStore</p>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setModal({ open: true, product: null })}
        >
          <Plus size={18} />
          Добавить товар
        </button>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>
            <ShoppingBag size={22} style={{ color: '#a78bfa' }} />
          </div>
          <div>
            <span className="admin-stat-value">{stats.total}</span>
            <span className="admin-stat-label">Всего товаров</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(34, 197, 94, 0.15)' }}>
            <DollarSign size={22} style={{ color: '#4ade80' }} />
          </div>
          <div>
            <span className="admin-stat-value">${stats.totalValue}</span>
            <span className="admin-stat-label">Стоимость склада</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(59, 130, 246, 0.15)' }}>
            <Boxes size={22} style={{ color: '#60a5fa' }} />
          </div>
          <div>
            <span className="admin-stat-value">{stats.categories}</span>
            <span className="admin-stat-label">Категорий</span>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: 'rgba(251, 146, 60, 0.15)' }}>
            <Package size={22} style={{ color: '#fb923c' }} />
          </div>
          <div>
            <span className="admin-stat-value">{stats.outOfStock}</span>
            <span className="admin-stat-label">Нет в наличии</span>
          </div>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Загрузка...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <Package size={64} strokeWidth={1} />
          <h3>Товаров пока нет</h3>
          <p>Добавьте первый товар</p>
          <button
            className="btn btn-primary"
            onClick={() => setModal({ open: true, product: null })}
          >
            <Plus size={18} /> Добавить товар
          </button>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Категория</th>
                <th>Цена</th>
                <th>Склад</th>
                <th>Дата</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
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
                      {p.stock} шт.
                    </span>
                  </td>
                  <td className="td-date">{p.created_at?.split(' ')[0]}</td>
                  <td className="td-actions">
                    <button
                      className="action-btn edit"
                      onClick={() => setModal({ open: true, product: p })}
                      title="Редактировать"
                    >
                      <Pencil size={16} />
                    </button>
                    {deleteConfirm === p.id ? (
                      <div className="delete-confirm">
                        <button
                          className="action-btn delete-yes"
                          onClick={() => handleDelete(p.id)}
                        >
                          Да
                        </button>
                        <button
                          className="action-btn delete-no"
                          onClick={() => setDeleteConfirm(null)}
                        >
                          Нет
                        </button>
                      </div>
                    ) : (
                      <button
                        className="action-btn delete"
                        onClick={() => setDeleteConfirm(p.id)}
                        title="Удалить"
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
