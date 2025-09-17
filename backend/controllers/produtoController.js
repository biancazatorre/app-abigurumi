const db = require('../db');

exports.getAll = async (req, res) => {
  const result = await db.query('SELECT * FROM produtos');
  res.json(result.rows);
};

exports.create = async (req, res) => {
  const { nome, descricao, preco, imagem_url } = req.body;
  const result = await db.query(
    'INSERT INTO produtos (nome, descricao, preco, imagem_url) VALUES ($1,$2,$3,$4) RETURNING *',
    [nome, descricao, preco, imagem_url]
  );
  res.status(201).json(result.rows[0]);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, imagem_url } = req.body;
  const result = await db.query(
    'UPDATE produtos SET nome=$1, descricao=$2, preco=$3, imagem_url=$4 WHERE id=$5 RETURNING *',
    [nome, descricao, preco, imagem_url, id]
  );
  res.json(result.rows[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM produtos WHERE id=$1', [id]);
  res.json({ message: 'Produto removido' });
};
