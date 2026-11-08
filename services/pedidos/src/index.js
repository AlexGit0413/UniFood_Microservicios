const app = require('./app');
const port = Number(process.env.PORT || 3004);
app.listen(port, '0.0.0.0', () => console.log('pedidos escuchando en puerto ' + port));
