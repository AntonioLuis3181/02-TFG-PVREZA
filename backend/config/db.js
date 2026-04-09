const mysql = require('mysql2/promise');
const { logMensaje } = require("../utils/logger.js");

// 1. Cargar las variables de entorno correctas (Tu lógica original, ¡muy buena!)
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

// 2. Imprimir las variables para depurar
if (logMensaje) {
    logMensaje("DBNAME: " + process.env.DB_NAME);
    logMensaje("DBHOST: " + process.env.DB_HOST);
    logMensaje("DBUSER: " + process.env.DB_USER);
    logMensaje("NODE_ENV: " + process.env.NODE_ENV);
}

// 3. CREAR LA CONEXIÓN (El motor de la base de datos)
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1", // Vital usar 127.0.0.1 para Docker
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "pvreza_db", // Corregido para tu TFG
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 4. Probar que la conexión funciona de verdad
pool.getConnection()
    .then(connection => {
        const msj = "✅ Conexión a la base de datos PVREZA en Docker establecida con éxito.";
        console.log(msj);
        if (logMensaje) logMensaje(msj);
        connection.release();
    })
    .catch(err => {
        const errorMsj = "❌ Error conectando a la base de datos: " + err.message;
        console.error(errorMsj);
        if (logMensaje) logMensaje(errorMsj);
    });

// 5. EXPORTAR EL POOL
// Esto es lo que permite que productos.controller.js pueda hacer pool.query()
module.exports = pool;