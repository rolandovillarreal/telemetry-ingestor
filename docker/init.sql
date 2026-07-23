CREATE TABLE IF NOT EXISTS telemetry_data (
    id SERIAL PRIMARY KEY,
    unit_id VARCHAR(50) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    speed NUMERIC(6, 2),
    course INTEGER,
    altitude NUMERIC(8, 2),
    satellites INTEGER,
    sensors JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Índice compuesto para optimizar consultas por unidad y rango de tiempo
CREATE INDEX IF NOT EXISTS idx_telemetry_unit_timestamp ON telemetry_data (unit_id, timestamp DESC);
