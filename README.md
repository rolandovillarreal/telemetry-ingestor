# 🚀 Wialon TCP Telemetry Ingestor & PostgreSQL Pipeline

> Servicio backend de alto rendimiento desarrollado en **Node.js** para la recepción, parseo y almacenamiento en tiempo real de tramas de telemetría bajo el protocolo **Wialon**, con persistencia en **PostgreSQL**.

---

## 📋 Características Principales

- **Servidor TCP Asíncrono:** Diseñado con el módulo nativo `net` de Node.js para manejar múltiples conexiones concurrentes de dispositivos GPS.
- **Parser de Protocolo Wialon:** Procesamiento robusto de tramas de inicio de sesión (`#L#`) y paquetes de datos posicionales (`#D#`), incluyendo conversión de coordenadas de formato de grados/minutos a grados decimales y extracción de sensores en formato JSON.
- **Persistencia Eficientada:** Conexión optimizada a base de datos relacional con índices espaciotemporales compuestos (`unit_id` + `timestamp DESC`) para consultas de alto rendimiento.
- **Preparado para Contenedores:** Orquestación completa mediante **Docker** y **Docker Compose** para un despliegue aislado y reproducible.

---

## 🛠️ Stack Tecnológico

- **Backend:** Node.js (v18+)
- **Base de Datos:** PostgreSQL (v15+)
- **Contenedorización:** Docker & Docker Compose
- **Pruebas Unitarias:** Jest

---

## ⚙️ Requisitos Previos

Asegúrate de contar con lo siguiente en tu entorno local:

- Node.js (versión 18 o superior)
- Gestor de paquetes `pnpm` (o en su defecto `npm`)
- Servidor PostgreSQL activo (o Docker instalado si prefieres levantar el contenedor)

---

## 🚀 Guía de Instalación y Ejecución Local

1. **Clonar el repositorio:**

   ```bash
   git clone [https://github.com/rolandovillarreal/telemetry-ingestor.git](https://github.com/rolandovillarreal/telemetry-ingestor.git)
   cd telemetry-ingestor
   ```

2. **Instalar dependencias:**

```bash
pnpm install
```

3. **Configurar las variables de entorno:**
   Crea un archivo .env en la raíz del proyecto basándote en la siguiente estructura:

```bash
Code snippet
DB_USER=tu_usuario_postgres
DB_HOST=localhost
DB_DATABASE=telemetry_db
DB_PASSWORD=tu_contraseña_postgres
DB_PORT=5432
DB_MAX_CONNECTIONS=20
TCP_PORT=puerto_tcp_cualquiera_mayor_1024
```

4. ** Inicializar la base de datos:**
   Ejecuta el script SQL ubicado en docker/init.sql sobre tu base de datos PostgreSQL para crear la tabla de telemetría y los índices correspondientes.

**Iniciar el servidor:**

```bash
npm start
```

---

## 🧪 Pruebas Automatizadas

El proyecto incluye pruebas unitarias para validar la precisión del parser de tramas frente a distintos escenarios (incluyendo valores vacíos o nulos).

Para ejecutar las pruebas:

```bash
pnpm test
```

---

## 📡 Simulación de Dispositivos (Pruebas Locales)

Si deseas probar el funcionamiento del servidor TCP sin un dispositivo GPS físico, puedes utilizar el cliente simulador incluido:

```bash
node test-client.js
```
