import { Link, useLocation } from 'react-router-dom';
import { Store, Shield, ShoppingBag } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <ShoppingBag size={24} />
          </div>
          <span className="logo-text">
            Toma<span className="logo-accent">Store</span>
          </span>
        </Link>

        <nav className="nav">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <Store size={18} />
            <span>Магазин</span>
          </Link>
          <Link
            to="/admin"
            className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
          >
            <Shield size={18} />
            <span>Админ</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
