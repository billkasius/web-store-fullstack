import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import StorePage from './pages/StorePage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<StorePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
