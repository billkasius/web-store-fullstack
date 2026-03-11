import { Link } from 'react-router-dom';
import { Tag, Layers } from 'lucide-react';
import { useLang } from '../contexts/LangContext';

const categoryColors = {
  'электроника': { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
  'одежда': { bg: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', border: 'rgba(236, 72, 153, 0.3)' },
  'еда': { bg: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: 'rgba(34, 197, 94, 0.3)' },
  'книги': { bg: 'rgba(251, 146, 60, 0.15)', color: '#fb923c', border: 'rgba(251, 146, 60, 0.3)' },
  'спорт': { bg: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: 'rgba(168, 85, 247, 0.3)' },
  'electronics': { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
  'clothing': { bg: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', border: 'rgba(236, 72, 153, 0.3)' },
  'food': { bg: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: 'rgba(34, 197, 94, 0.3)' },
  'books': { bg: 'rgba(251, 146, 60, 0.15)', color: '#fb923c', border: 'rgba(251, 146, 60, 0.3)' },
  'sports': { bg: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: 'rgba(168, 85, 247, 0.3)' },
};

const defaultCategoryStyle = { bg: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', border: 'rgba(139, 92, 246, 0.3)' };

function getCategoryStyle(category) {
  if (!category) return defaultCategoryStyle;
  return categoryColors[category.toLowerCase()] || defaultCategoryStyle;
}

function getCategoryIcon(category) {
  if (!category) return '📦';
  const icons = {
    'электроника': '📱', 'одежда': '👕', 'еда': '🍕',
    'книги': '📚', 'спорт': '⚽', 'игры': '🎮',
    'electronics': '📱', 'clothing': '👕', 'food': '🍕',
    'books': '📚', 'sports': '⚽', 'games': '🎮',
  };
  return icons[category.toLowerCase()] || '📦';
}

export default function ProductCard({ product, index = 0 }) {
  const { t } = useLang();
  const catStyle = getCategoryStyle(product.category);

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card card-animate"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="product-card-image">
        <div className="product-card-icon">
          <span className="product-emoji">{getCategoryIcon(product.category)}</span>
        </div>
        <div className="card-image-shine" />
        {product.stock > 0 ? (
          <span className="badge badge-instock">{t.inStock}</span>
        ) : (
          <span className="badge badge-outstock">{t.outOfStock}</span>
        )}
      </div>

      <div className="product-card-body">
        {product.category && (
          <span
            className="product-category-tag"
            style={{
              background: catStyle.bg,
              color: catStyle.color,
              border: `1px solid ${catStyle.border}`,
            }}
          >
            <Tag size={12} />
            {product.category}
          </span>
        )}

        <h3 className="product-card-title">{product.name}</h3>

        {product.description && (
          <p className="product-card-desc">{product.description}</p>
        )}

        <div className="product-card-footer">
          <div className="product-price">
            <span className="price-value">${product.price}</span>
          </div>
          <div className="product-stock">
            <Layers size={14} />
            <span>{product.stock} {t.pcs}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
