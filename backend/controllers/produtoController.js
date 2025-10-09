

const db = require('../db'); // A conexão com o banco de dados fica aqui!

// Função para LISTAR TODOS os produtos
const getAll = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM produtos ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao listar produtos:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função para BUSCAR UM produto pelo ID
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM produtos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao buscar produto por ID:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função para CRIAR um novo produto
const create = async (req, res) => {
  try {
    const { nome, descricao, preco, imagem_url } = req.body;
    if (!nome || !preco) {
      return res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
    }
    const result = await db.query(
      `INSERT INTO produtos (nome, descricao, preco, imagem_url) VALUES ($1, $2, $3, $4) RETURNING *`,
      [nome, descricao, preco, imagem_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função para ATUALIZAR um produto
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, preco, imagem_url } = req.body;
        if (!nome || !preco) {
            return res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
        }
        const result = await db.query(
            `UPDATE produtos SET nome = $1, descricao = $2, preco = $3, imagem_url = $4 WHERE id = $5 RETURNING *`,
            [nome, descricao, preco, imagem_url, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado para atualizar.' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Erro ao atualizar produto:", err);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

// Função para DELETAR um produto
const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM produtos WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Produto não encontrado para deletar.' });
        }
        res.status(204).send();
    } catch (err) {
        console.error("Erro ao deletar produto:", err);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};


// Exporta todas as funções
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};