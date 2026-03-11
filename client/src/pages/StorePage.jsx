import { useState, useMemo } from 'react';
import { Package, TrendingUp, Boxes, Sparkles } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useLang } from '../contexts/LangContext';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

export default function StorePage() {
  const { t } = useLang();
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
        <div className="hero-content fade-in-up">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>{t.heroBadge}</span>
          </div>
          <h1 className="hero-title">
            {t.heroTitle1} <span className="gradient-text">{t.heroTitle2}</span>
          </h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>

          {stats && (
            <div className="hero-stats">
              <div className="stat stat-animate" style={{ animationDelay: '0.1s' }}>
                <Package size={20} />
                <div>
                  <span className="stat-value">{stats.total}</span>
                  <span className="stat-label">{t.products}</span>
                </div>
              </div>
              <div className="stat stat-animate" style={{ animationDelay: '0.2s' }}>
                <Boxes size={20} />
                <div>
                  <span className="stat-value">{stats.categories}</span>
                  <span className="stat-label">{t.categories}</span>
                </div>
              </div>
              <div className="stat stat-animate" style={{ animationDelay: '0.3s' }}>
                <TrendingUp size={20} />
                <div>
                  <span className="stat-value">${stats.avgPrice}</span>
                  <span className="stat-label">{t.avgPrice}</span>
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
            <p>{t.loading}</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>{t.errorLoading}: {error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="empty-state fade-in-up">
            <Package size={64} strokeWidth={1} />
            <h3>{t.productNotFound}</h3>
            <p>{t.resetFilters}</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <div className="results-count">
              {t.found}: <strong>{products.length}</strong> {t.items}
            </div>
            <div className="products-grid">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
