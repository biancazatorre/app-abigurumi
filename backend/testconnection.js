const db = require('./db');

async function testConnection() {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('✅ Conectado ao banco:', result.rows[0]);
    process.exit();
  } catch (err) {
    console.error('❌ Erro na conexão com o banco:', err);
    process.exit(1);
  }
}

testConnection();
