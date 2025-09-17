// scripts/createAdmin.js
const db = require('../db');
const bcrypt = require('bcrypt');
require('dotenv').config();

(async () => {
  try {
    const nome = 'Admin';
    const celular = '11999999999';
    const senha = 'admin123';
    const hashed = await bcrypt.hash(senha, 10);

    const exists = await db.query('SELECT id FROM usuarios WHERE celular=$1', [celular]);
    if (exists.rows.length > 0) {
      console.log('Admin já existe');
      process.exit(0);
    }
    await db.query(
      `INSERT INTO usuarios (nome, celular, senha, tipo) VALUES ($1,$2,$3,'admin')`,
      [nome, celular, hashed]
    );
    console.log('Admin criado com sucesso');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
