import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Store, Settings, Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLang } from '../contexts/LangContext';

export default function Header() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <ShoppingBag size={22} />
          </div>
          <span className="logo-text">
            Toma<span className="logo-accent">Store</span>
          </span>
        </Link>

        <div className="header-right">
          <nav className="nav">
            <Link to="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
              <Store size={18} />
              <span>{t.store}</span>
            </Link>
            <Link to="/admin" className={`nav-link ${pathname === '/admin' ? 'active' : ''}`}>
              <Settings size={18} />
              <span>{t.admin}</span>
            </Link>
          </nav>

          <div className="header-controls">
            <button
              className="control-btn"
              onClick={toggleLang}
              title={lang === 'ru' ? 'Switch to English' : 'Переключить на русский'}
            >
              <Languages size={18} />
              <span className="control-label">{lang.toUpperCase()}</span>
            </button>
            <button
              className="control-btn"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              <span className="theme-icon-wrapper">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
