const app = require('./app');
const { initDb } = require('./db');

initDb();

const port = Number(process.env.PORT || 3001);
app.listen(port, '0.0.0.0', () => console.log('estudiantes escuchando en puerto ' + port));
