const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nome, celular, senha, data_nascimento, preferencia, valor_produto } = req.body;

    const hashedPassword = await bcrypt.hash(senha, 10);

    const result = await db.query(
      `INSERT INTO usuarios (nome, celular, senha, data_nascimento, preferencia, valor_produto)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, nome, celular`,
      [nome, celular, hashedPassword, data_nascimento, preferencia, valor_produto]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { celular, senha } = req.body;

    const result = await db.query('SELECT * FROM usuarios WHERE celular = $1', [celular]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Usuário não encontrado' });

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) return res.status(401).json({ error: 'Senha inválida' });

    const token = jwt.sign({ id: user.id, tipo: user.tipo }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, nome: user.nome, tipo: user.tipo } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
