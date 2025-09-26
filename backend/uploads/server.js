// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Torna a pasta 'uploads' publicamente acessível
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas da API
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));