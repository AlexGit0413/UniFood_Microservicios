const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const fs = require('node:fs');

let dbInstance = null;

function initDb(customPath) {
  const dbPath = customPath || process.env.DB_PATH || path.join(__dirname, '..', 'data', 'estudiantes.sqlite');

  if (dbPath !== ':memory:') {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  dbInstance = new DatabaseSync(dbPath);

  // Crear tabla estudiantes
  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS estudiantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombres TEXT NOT NULL,
      apellidos TEXT NOT NULL,
      universidad TEXT NOT NULL,
      codigoUniversitario TEXT NOT NULL UNIQUE,
      creadoEn TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  return dbInstance;
}

function getDb() {
  if (!dbInstance) {
    initDb();
  }
  return dbInstance;
}

function crearEstudiante({ nombres, apellidos, universidad, codigoUniversitario }) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO estudiantes (nombres, apellidos, universidad, codigoUniversitario)
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(nombres.trim(), apellidos.trim(), universidad.trim(), codigoUniversitario.trim());
  const id = Number(result.lastInsertRowid);

  return obtenerEstudiantePorId(id);
}

function obtenerEstudiantePorId(id) {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT id, nombres, apellidos, universidad, codigoUniversitario
    FROM estudiantes
    WHERE id = ?
  `);
  return stmt.get(Number(id)) || null;
}

function obtenerEstudiantePorCodigo(codigoUniversitario) {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT id, nombres, apellidos, universidad, codigoUniversitario
    FROM estudiantes
    WHERE codigoUniversitario = ?
  `);
  return stmt.get(codigoUniversitario.trim()) || null;
}

function cerrarDb() {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

module.exports = {
  initDb,
  getDb,
  crearEstudiante,
  obtenerEstudiantePorId,
  obtenerEstudiantePorCodigo,
  cerrarDb
};
