const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  max: parseInt(process.env.DB_MAX_CONNECTIONS, 10) || 20,
});

// Probar conexión a la DB al iniciar
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('❌ Error al conectar a PostgreSQL:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Conexión establecida con PostgreSQL de forma segura.');
  }
});

module.exports = pool;
