const net = require('net');
const { parseTelemetryData } = require('../utils/parser');
const { saveTelemetry } = require('../models/telemetryModel');

const startTcpServer = (port) => {
  const server = net.createServer((socket) => {
    let currentUnitId = null;

    console.log(
      `[TCP] Nueva conexión establecida desde ${socket.remoteAddress}:${socket.remotePort}`,
    );

    socket.on('data', async (data) => {
      const rawText = data.toString('utf-8').trim();

      // --- CASO 1: Registro de Unidad (#L#ident\r\n) ---
      if (rawText.startsWith('#L#')) {
        const parts = rawText.replace('#L#', '').split(';');
        currentUnitId = parts[0];
        console.log(`[TCP] Unidad identificada (Login): ${currentUnitId}`);

        socket.write('#AL#1\r\n');
        return;
      }

      // --- CASO 2: Trama de datos ---
      if (rawText.startsWith('#D#')) {
        console.log(
          `[TCP] Trama de datos recibida de Unidad (${currentUnitId || 'Desconocida'}): ${rawText}`,
        );

        // Responder inmediatamente al repetidor con el byte de éxito
        socket.write(Buffer.from([0x11]));

        if (!currentUnitId) {
          console.warn(
            '⚠️ Se recibió una trama de datos sin un login previo de unidad.',
          );
          return;
        }

        try {
          const telemetryData = parseTelemetryData(rawText);
          await saveTelemetry(currentUnitId, telemetryData);
          console.log(`💾 [DB] Guardado exitoso de la unidad ${currentUnitId}`);
        } catch (err) {
          console.error(
            '❌ Error al decodificar o guardar la trama:',
            err.message,
          );
        }
      }
    });

    socket.on('end', () => {
      console.log(
        `[TCP] Conexión cerrada de forma ordenada para la unidad: ${currentUnitId || 'Desconocida'}`,
      );
    });

    socket.on('error', (err) => {
      console.error(`[TCP] Error en conexión de socket: ${err.message}`);
    });
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(
      `🚀 Servidor TCP nativo para Wialon escuchando en el puerto ${port}`,
    );
  });

  return server;
};

module.exports = {
  startTcpServer,
};
