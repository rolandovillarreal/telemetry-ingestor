const parseTelemetryData = (rawText) => {
  const cleanData = rawText.replace('#D#', '');
  const parts = cleanData.split(';');

  const datePart = parts[0]; // DDMMYY
  const timePart = parts[1]; // HHMMSS

  let timestamp = new Date();
  if (datePart && timePart && datePart !== 'NA' && timePart !== 'NA') {
    const day = datePart.substring(0, 2);
    const month = datePart.substring(2, 4);
    const year = '20' + datePart.substring(4, 6);
    const hour = timePart.substring(0, 2);
    const min = timePart.substring(2, 4);
    const sec = timePart.substring(4, 6);
    timestamp = new Date(`${year}-${month}-${day}T${hour}:${min}:${sec}Z`);
  }

  const latDeg = parseFloat(parts[2]);
  const latMin = parseFloat(parts[3]);
  const lonDeg = parseFloat(parts[4]);
  const lonMin = parseFloat(parts[5]);

  const lat = !isNaN(latDeg) && !isNaN(latMin) ? latDeg + latMin / 60 : null;
  const lon = !isNaN(lonDeg) && !isNaN(lonMin) ? lonDeg + lonMin / 60 : null;

  const speed = parts[6] !== 'NA' ? parseFloat(parts[6]) : null;
  const course = parts[7] !== 'NA' ? parseInt(parts[7]) : null;
  const altitude = parts[8] !== 'NA' ? parseFloat(parts[8]) : null;
  const sats = parts[9] !== 'NA' ? parseInt(parts[9]) : null;

  let sensors = {};
  if (parts[10] && parts[10] !== 'NA') {
    const extraParams = parts[10].split(',');
    extraParams.forEach((param) => {
      const subParts = param.split(':');
      if (subParts.length >= 3) {
        const name = subParts[0];
        const val = subParts[2];
        sensors[name] = isNaN(val) ? val : parseFloat(val);
      }
    });
  }
  return {
    timestamp,
    lat,
    lon,
    speed,
    course,
    altitude,
    sats,
    sensors,
  };
};

module.exports = {
  parseTelemetryData,
};
