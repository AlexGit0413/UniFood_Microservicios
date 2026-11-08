const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');

function openDb(file = process.env.DB_PATH || './data/validaciones.sqlite') {
  if (file !== ':memory:') fs.mkdirSync(path.dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec(`
    CREATE TABLE IF NOT EXISTS validaciones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      estudiante_id INTEGER NOT NULL,
      numero_carne TEXT NOT NULL,
      fecha_vencimiento TEXT NOT NULL,
      estado TEXT NOT NULL DEFAULT 'PENDIENTE',
      creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`);
  return db;
}

module.exports = { openDb };
