const { parseTelemetryData } = require('../src/utils/parser');

describe('parseTelemetryData', () => {
  test('should correctly parse a valid Wialon data packet', () => {
    // Trama de ejemplo: #D#date;time;latDeg;latMin;lonDeg;lonMin;speed;course;alt;sats;sensors
    const rawPacket =
      '#D#220726;160000;25;40.1234;-100;18.5678;65.4;180;540.2;8;ignition:1:1,fuel:2:45.5';

    const result = parseTelemetryData(rawPacket);

    expect(result).toHaveProperty('timestamp');
    expect(result.lat).toBeCloseTo(25 + 40.1234 / 60, 5);
    expect(result.lon).toBeCloseTo(-100 + 18.5678 / 60, 5);
    expect(result.speed).toBe(65.4);
    expect(result.course).toBe(180);
    expect(result.altitude).toBe(540.2);
    expect(result.sats).toBe(8);
    expect(result.sensors).toEqual({
      ignition: 1,
      fuel: 45.5,
    });
  });

  test('should handle "NA" values gracefully', () => {
    const rawPacket = '#D#NA;NA;NA;NA;NA;NA;NA;NA;NA;NA;NA';

    const result = parseTelemetryData(rawPacket);

    expect(result.lat).toBeNull();
    expect(result.lon).toBeNull();
    expect(result.speed).toBeNull();
    expect(result.course).toBeNull();
    expect(result.altitude).toBeNull();
    expect(result.sats).toBeNull();
    expect(result.sensors).toEqual({});
  });
});
