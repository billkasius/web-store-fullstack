import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tag, Layers, Calendar, Package } from 'lucide-react';
import { api } from '../services/api';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.getProduct(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="page-center">
        <div className="spinner" />
        <p>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-center">
        <p className="error-text">Ошибка: {error}</p>
        <Link to="/" className="btn btn-primary">На главную</Link>
      </div>
    );
  }

  const categoryIcons = {
    'электроника': '📱', 'одежда': '👕', 'еда': '🍕',
    'книги': '📚', 'спорт': '⚽', 'игры': '🎮',
  };
  const emoji = categoryIcons[product.category?.toLowerCase()] || '📦';

  return (
    <div className="product-page">
      <div className="product-page-inner">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          <span>Назад к каталогу</span>
        </Link>

        <div className="product-detail">
          <div className="product-detail-image">
            <div className="product-detail-icon">
              <span className="detail-emoji">{emoji}</span>
            </div>
          </div>

          <div className="product-detail-info">
            <div className="product-detail-header">
              {product.category && (
                <span className="product-category-tag detail-tag">
                  <Tag size={14} />
                  {product.category}
                </span>
              )}
              <h1>{product.name}</h1>
            </div>

            {product.description && (
              <p className="product-detail-desc">{product.description}</p>
            )}

            <div className="product-detail-price">
              <span className="detail-price-value">${product.price}</span>
            </div>

            <div className="product-detail-meta">
              <div className="meta-item">
                <Layers size={18} />
                <span>На складе: <strong>{product.stock} шт.</strong></span>
              </div>
              <div className="meta-item">
                <Calendar size={18} />
                <span>Добавлен: <strong>{product.created_at}</strong></span>
              </div>
              <div className="meta-item">
                <Package size={18} />
                <span>
                  Статус:{' '}
                  <strong className={product.stock > 0 ? 'text-green' : 'text-red'}>
                    {product.stock > 0 ? 'В наличии' : 'Нет в наличии'}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
