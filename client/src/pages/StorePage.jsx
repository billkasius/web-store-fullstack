import { useState, useMemo } from 'react';
import { Package, TrendingUp, Boxes, Sparkles } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

export default function StorePage() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const debouncedFilters = useMemo(() => {
    const f = {};
    if (filters.search) f.search = filters.search;
    if (filters.category) f.category = filters.category;
    if (filters.minPrice) f.minPrice = filters.minPrice;
    if (filters.maxPrice) f.maxPrice = filters.maxPrice;
    return f;
  }, [filters]);

  const { products, loading, error } = useProducts(debouncedFilters);

  const stats = useMemo(() => {
    if (!products.length) return null;
    return {
      total: products.length,
      categories: [...new Set(products.map((p) => p.category).filter(Boolean))].length,
      avgPrice: (products.reduce((s, p) => s + p.price, 0) / products.length).toFixed(0),
    };
  }, [products]);

  return (
    <div className="store-page">
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Премиум маркетплейс</span>
          </div>
          <h1 className="hero-title">
            Добро пожаловать в <span className="gradient-text">TomaStore</span>
          </h1>
          <p className="hero-subtitle">
            Откройте для себя лучшие товары по невероятным ценам
          </p>

          {stats && (
            <div className="hero-stats">
              <div className="stat">
                <Package size={20} />
                <div>
                  <span className="stat-value">{stats.total}</span>
                  <span className="stat-label">Товаров</span>
                </div>
              </div>
              <div className="stat">
                <Boxes size={20} />
                <div>
                  <span className="stat-value">{stats.categories}</span>
                  <span className="stat-label">Категорий</span>
                </div>
              </div>
              <div className="stat">
                <TrendingUp size={20} />
                <div>
                  <span className="stat-value">${stats.avgPrice}</span>
                  <span className="stat-label">Средняя цена</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="store-content">
        <SearchBar filters={filters} onFilterChange={setFilters} />

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Загрузка товаров...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>Ошибка: {error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="empty-state">
            <Package size={64} strokeWidth={1} />
            <h3>Товары не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <div className="results-count">
              Найдено: <strong>{products.length}</strong> товаров
            </div>
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
