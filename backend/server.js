// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// --- IMPORTS DAS ROTAS ---
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const uploadRoutes = require('./routes/uploadRoutes'); 
const carrinhoRoutes = require('./routes/carrinhoRoutes');
const app = express();
app.use(cors());
app.use(express.json());

// --- CONFIGURAÇÕES ESTÁTICAS E DE ROTAS ---

// Torna a pasta 'uploads' publicamente acessível para o app buscar as imagens
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // <-- 2. GARANTA QUE ESTA LINHA EXISTE

// Define os endpoints da API
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api', uploadRoutes); 
app.use('/api/carrinho', carrinhoRoutes); // 👈 Adicione esta linha

// --- INÍCIO DO SERVIDOR ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));