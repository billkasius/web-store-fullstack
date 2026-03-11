import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ filters, onFilterChange }) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="search-section">
      <div className="search-bar">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="search-input"
        />
        {filters.search && (
          <button
            className="search-clear"
            onClick={() => onFilterChange({ ...filters, search: '' })}
          >
            <X size={16} />
          </button>
        )}
        <button
          className={`filter-toggle ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={18} />
          <span>Фильтры</span>
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Категория</label>
            <input
              type="text"
              placeholder="Например: электроника"
              value={filters.category}
              onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            />
          </div>
          <div className="filter-group">
            <label>Мин. цена</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
            />
          </div>
          <div className="filter-group">
            <label>Макс. цена</label>
            <input
              type="number"
              placeholder="999999"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
            />
          </div>
          <button
            className="btn btn-ghost"
            onClick={() =>
              onFilterChange({ search: '', category: '', minPrice: '', maxPrice: '' })
            }
          >
            <X size={16} />
            Сбросить
          </button>
        </div>
      )}
    </div>
  );
}
