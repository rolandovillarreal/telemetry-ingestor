const net = require('net');

const PORT = 22167;
const HOST = '127.0.0.1';

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log('🔌 Conectado al servidor de telemetría.');

  // 1. Enviar trama de Login de la unidad
  const unitId = '358201012345678';
  const loginPacket = `#L#${unitId};1\r\n`;

  console.log(`[Enviando Login]: ${loginPacket.trim()}`);
  client.write(loginPacket);
});

client.on('data', (data) => {
  console.log(`📥 Respuesta del servidor: ${data.toString('utf-8').trim()}`);

  // Una vez que el servidor responde al login, empezamos a enviar tramas de posición cada 3 segundos
  setInterval(() => {
    // Generar fecha y hora actual en formato Wialon (DDMMYY;HHMMSS)
    const now = new Date();
    const day = String(now.getUTCDate()).padStart(2, '0');
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const year = String(now.getUTCFullYear()).slice(-2);
    const hour = String(now.getUTCHours()).padStart(2, '0');
    const min = String(now.getUTCMinutes()).padStart(2, '0');
    const sec = String(now.getUTCSeconds()).padStart(2, '0');

    const datePart = `${day}${month}${year}`;
    const timePart = `${hour}${min}${sec}`;

    // Coordenadas simuladas (ej. zona de Monterrey)
    const latDeg = 25;
    const latMin = 40.1234;
    const lonDeg = -100;
    const lonMin = 18.5678;
    const speed = 65.4;
    const course = 180;
    const altitude = 540.2;
    const sats = 8;
    const sensors = 'ignition:1:1,fuel:2:45.5';

    const dataPacket = `#D#${datePart};${timePart};${latDeg};${latMin};${lonDeg};${lonMin};${speed};${course};${altitude};${sats};${sensors}\r\n`;

    console.log(`[Enviando Trama]: ${dataPacket.trim()}`);
    client.write(dataPacket);
  }, 3000);
});

client.on('close', () => {
  console.log('❌ Conexión cerrada con el servidor.');
});

client.on('error', (err) => {
  console.error('⚠️ Error en el cliente TCP:', err.message);
});
