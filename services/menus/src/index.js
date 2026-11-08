const app = require('./app');
const port = Number(process.env.PORT || 3003);
app.listen(port, '0.0.0.0', () => console.log('menus escuchando en puerto ' + port));
