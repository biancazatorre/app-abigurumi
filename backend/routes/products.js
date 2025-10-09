// routes/products.js
const express = require('express');
const router = express.Router();

// Importa todas as funções do nosso novo controller
const { 
  getAll, 
  getById, 
  create, 
  update, 
  remove 
} = require('../controllers/produtoController');

// Importa os middlewares de autenticação
const { verifyToken, ensureAdmin } = require('../middleware/auth');

// --- MAPEAMENTO DAS ROTAS ---

// Rotas públicas (não precisam de login)
router.get('/', getAll);
router.get('/:id', getById);

// Rotas protegidas (precisam de token de admin)
router.post('/', [verifyToken, ensureAdmin], create);
router.put('/:id', [verifyToken, ensureAdmin], update);
router.delete('/:id', [verifyToken, ensureAdmin], remove);

// Exporta o router configurado
module.exports = router;