// routes/products.js
const express = require('express');
const router = express.Router();
const { getAll, create, update, remove } = require('../controllers/produtoController');

// 👇 1. Importe os dois middlewares do seu arquivo auth.js
const { verifyToken, ensureAdmin } = require('../middleware/auth');

// Rota pública para listar todos os produtos (não precisa de token)
router.get('/', getAll);

// routes/products.js

// ... (imports e as rotas de GET all, POST, PUT, DELETE)

// Rota para BUSCAR UM produto pelo seu ID (pública)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM produtos WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao buscar produto:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = router;

// 👇 2. Aplique os dois middlewares em sequência para as rotas de admin
// Primeiro o 'verifyToken' vai rodar, depois o 'ensureAdmin'.
router.post('/', [verifyToken, ensureAdmin], create);
router.put('/:id', [verifyToken, ensureAdmin], update);
router.delete('/:id', [verifyToken, ensureAdmin], remove);

module.exports = router;