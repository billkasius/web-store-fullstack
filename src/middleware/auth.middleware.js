const db = require('../db/database');

function authMiddleware(req, res, next) {
  const username = req.headers['x-username'];
  const password = req.headers['x-password'];

  if (!username || !password) {
    return res.status(401).json({ error: 'Требуется авторизация' });
  }

  const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?')
    .get(username, password);

  if (!user) {
    return res.status(401).json({ error: 'Неверный логин или пароль' });
  }

  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Недостаточно прав' });
  }

  req.user = user;
  next();
}

module.exports = authMiddleware;