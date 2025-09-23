// routes/users.js
const express = require('express');
const router = express.Router(); // LINHA CORRIGIDA
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// GET /api/users - Rota para listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT id, nome, celular, tipo, data_nascimento FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

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

// POST /api/users/login (com depuração)
router.post('/login', async (req, res) => {
  console.log("\n--- NOVA TENTATIVA DE LOGIN ---");
  try {
    console.log("1. Dados recebidos no req.body:", req.body);
    const { celular, senha } = req.body;

    if (!celular || !senha) {
      console.log("Erro: Celular ou senha não foram enviados no body.");
      return res.status(400).json({ error: "Celular e senha são obrigatórios." });
    }
    
    console.log(`2. Buscando usuário com o celular: '${celular}'`);
    const result = await db.query('SELECT * FROM usuarios WHERE celular = $1', [celular]);

    if (result.rows.length === 0) {
      console.log("3. Resultado da busca: Usuário NÃO encontrado no banco de dados.");
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }
    
    console.log("3. Resultado da busca: Usuário encontrado!");
    const user = result.rows[0];
    console.log("   - Hash da senha que está no banco:", user.senha);
    console.log("   - Tamanho do hash do banco:", user.senha.length);

    console.log(`4. Comparando a senha enviada ('${senha}') com o hash do banco...`);
    const match = await bcrypt.compare(senha, user.senha);

    if (!match) {
      console.log("5. Resultado da comparação: AS SENHAS NÃO BATEM!");
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }

    console.log("5. Resultado da comparação: TUDO CERTO! Senhas batem.");
    
    const token = jwt.sign({ userId: user.id, tipo: user.tipo }, process.env.JWT_SECRET, { expiresIn: '24h' });
    delete user.senha;
    console.log("6. Login bem-sucedido. Enviando token.");
    res.json({ token, user });

  } catch (err) {
    console.error("!!! ERRO INESPERADO NO BLOCO CATCH:", err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});


module.exports = router;