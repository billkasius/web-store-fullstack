const express = require('express');
const cors = require('cors');
const productRoutes = require('./src/routes/product.routes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Роуты
app.use('/api/products', productRoutes);

// Проверка что сервер работает
app.get('/', (req, res) => {
  res.json({ message: 'Products API работает!' });
});

// Обработка несуществующих маршрутов
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});