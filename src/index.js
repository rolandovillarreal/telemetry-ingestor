require('dotenv').config();
const { startTcpServer } = require('./services/tcpServer');

const PORT = parseInt(process.env.TCP_PORT, 10) || 22167;

// Iniciar servidor
startTcpServer(PORT);
