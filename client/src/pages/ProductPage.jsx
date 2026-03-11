import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Tag, Layers, Calendar, Package } from 'lucide-react';
import { api } from '../services/api';
import { useLang } from '../contexts/LangContext';

export default function ProductPage() {
  const { id } = useParams();
  const { t } = useLang();
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
        <p>{t.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-center">
        <p className="error-text">{t.errorLoading}: {error}</p>
        <Link to="/" className="btn btn-primary">{t.store}</Link>
      </div>
    );
  }

  const categoryIcons = {
    'электроника': '📱', 'одежда': '👕', 'еда': '🍕',
    'книги': '📚', 'спорт': '⚽', 'игры': '🎮',
    'electronics': '📱', 'clothing': '👕', 'food': '🍕',
    'books': '📚', 'sports': '⚽', 'games': '🎮',
  };
  const emoji = categoryIcons[product.category?.toLowerCase()] || '📦';

  return (
    <div className="product-page">
      <div className="product-page-inner fade-in-up">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          <span>{t.backToCatalog}</span>
        </Link>

        <div className="product-detail">
          <div className="product-detail-image">
            <div className="product-detail-icon pulse-glow">
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

            <p className="product-detail-desc">
              {product.description || t.noDescription}
            </p>

            <div className="product-detail-price">
              <span className="detail-price-value">${product.price}</span>
            </div>

            <div className="product-detail-meta">
              <div className="meta-item">
                <Layers size={18} />
                <span>{t.stock}: <strong>{product.stock} {t.pcs}</strong></span>
              </div>
              <div className="meta-item">
                <Calendar size={18} />
                <span>{t.added}: <strong>{product.created_at}</strong></span>
              </div>
              <div className="meta-item">
                <Package size={18} />
                <span>
                  {t.status}:{' '}
                  <strong className={product.stock > 0 ? 'text-green' : 'text-red'}>
                    {product.stock > 0 ? t.available : t.unavailable}
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
