// routes/carrinhoRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../middleware/auth'); // Usaremos o middleware para proteger as rotas

// ROTA PARA BUSCAR O CARRINHO DO USUÁRIO LOGADO
router.get('/', verifyToken, async (req, res) => {
    try {
        const { userId } = req.user; // Pegamos o ID do usuário do token
        const result = await db.query(
            `SELECT p.*, c.quantidade FROM carrinho c
             JOIN produtos p ON c.produto_id = p.id
             WHERE c.usuario_id = $1`,
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Erro ao buscar carrinho:", err);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

// ROTA PARA ADICIONAR/ATUALIZAR UM ITEM NO CARRINHO
router.post('/', verifyToken, async (req, res) => {
    const { userId } = req.user;
    const { produtoId, quantidade } = req.body;

    try {
        // Verifica se o item já existe no carrinho daquele usuário
        const itemExistente = await db.query(
            'SELECT * FROM carrinho WHERE usuario_id = $1 AND produto_id = $2',
            [userId, produtoId]
        );

        if (itemExistente.rows.length > 0) {
            // Se existe, atualiza a quantidade
            const novaQuantidade = itemExistente.rows[0].quantidade + quantidade;
            await db.query(
                'UPDATE carrinho SET quantidade = $1 WHERE usuario_id = $2 AND produto_id = $3',
                [novaQuantidade, userId, produtoId]
            );
        } else {
            // Se não existe, insere um novo item
            await db.query(
                'INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES ($1, $2, $3)',
                [userId, produtoId, quantidade]
            );
        }
        res.status(201).json({ message: 'Item adicionado/atualizado no carrinho' });
    } catch (err) {
        console.error("Erro ao adicionar ao carrinho:", err);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

// ROTA PARA REMOVER UM ITEM DO CARRINHO
router.delete('/:produtoId', verifyToken, async (req, res) => {
    const { userId } = req.user;
    const { produtoId } = req.params;

    try {
        await db.query(
            'DELETE FROM carrinho WHERE usuario_id = $1 AND produto_id = $2',
            [userId, produtoId]
        );
        res.status(204).send(); // Sucesso, sem conteúdo
    } catch (err) {
        console.error("Erro ao remover do carrinho:", err);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

module.exports = router;