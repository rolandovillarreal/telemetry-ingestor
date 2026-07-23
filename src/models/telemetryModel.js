const pool = require('../config/database');

const saveTelemetry = async (unitId, telemetryData) => {
  const queryText = `
    INSERT INTO telemetry_data (
      unit_id, timestamp, latitude, longitude, speed, course, altitude, satellites, sensors
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `;

  const values = [
    unitId,
    telemetryData.timestamp.toISOString(),
    telemetryData.lat,
    telemetryData.lon,
    telemetryData.speed,
    telemetryData.course,
    telemetryData.altitude,
    telemetryData.sats,
    JSON.stringify(telemetryData.sensors),
  ];

  await pool.query(queryText, values);
};

module.exports = {
  saveTelemetry,
};
