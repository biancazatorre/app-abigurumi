// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { nome, celular, senha, data_nascimento, preferencia, valor_produto } = req.body;
    if (!nome || !celular || !senha) return res.status(400).json({ error: 'Dados incompletos' });
    if (senha.length < 6) return res.status(400).json({ error: 'Senha precisa ter ao menos 6 caracteres' });

    const hashed = await bcrypt.hash(senha, 10);
    const result = await db.query(
      `INSERT INTO usuarios (nome, celular, senha, data_nascimento, preferencia, valor_produto, tipo)
       VALUES ($1,$2,$3,$4,$5,$6,'cliente') RETURNING id,nome,celular,tipo`,
      [nome, celular, hashed, data_nascimento || null, preferencia || null, valor_produto || 5]
    );
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Celular já cadastrado' });
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { celular, senha } = req.body;
    const result = await db.query('SELECT * FROM usuarios WHERE celular = $1', [celular]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    const user = result.rows[0];
    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.status(401).json({ error: 'Usuário ou senha inválidos' });
router.get('/', async (req, res) => {
  try {
    // Busca todos os usuários no banco de dados, selecionando apenas colunas seguras
    const result = await db.query('SELECT id, nome, celular, tipo, data_nascimento FROM usuarios');
    // Retorna a lista de usuários
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
  });
    const token = jwt.sign({ userId: user.id, tipo: user.tipo }, process.env.JWT_SECRET, { expiresIn: '24h' });
    // Não enviar senha de volta
    delete user.senha;
    res.json({ token, user: { id: user.id, nome: user.nome, celular: user.celular, tipo: user.tipo } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

module.exports = router;
