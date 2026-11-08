const test = require('node:test');
const assert = require('node:assert');
const { createApp } = require('../src/app');
const { openDb } = require('../src/db');

const estudianteExiste = async () => ({ ok: true, status: 200, json: async () => ({ id: 1 }) });
const estudianteNoExiste = async () => ({ ok: false, status: 404 });
const servicioCaido = async () => { throw new Error('ECONNREFUSED'); };

function iniciar(fetchFn) {
  const app = createApp({ db: openDb(':memory:'), estudiantesUrl: 'http://estudiantes:3001', fetchFn });
  return new Promise((resolve) => {
    const server = app.listen(0, () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` }));
  });
}

const json = (method, url, body) =>
  fetch(url, { method, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });

const solicitud = { estudianteId: 1, numeroCarne: 'CAR001', fechaVencimiento: '2027-12-31' };

test('crea una solicitud con estado PENDIENTE', async () => {
  const { server, url } = await iniciar(estudianteExiste);
  const res = await json('POST', `${url}/validaciones`, solicitud);
  const data = await res.json();
  assert.strictEqual(res.status, 201);
  assert.strictEqual(data.estado, 'PENDIENTE');
  assert.strictEqual(data.estudianteId, 1);
  server.close();
});

test('aprueba una solicitud y la consulta por estudiante', async () => {
  const { server, url } = await iniciar(estudianteExiste);
  const creada = await (await json('POST', `${url}/validaciones`, solicitud)).json();
  const res = await json('PATCH', `${url}/validaciones/${creada.id}`, { estado: 'APROBADO' });
  assert.strictEqual(res.status, 200);
  const consulta = await (await fetch(`${url}/validaciones/estudiantes/1`)).json();
  assert.strictEqual(consulta.estado, 'APROBADO');
  server.close();
});

test('rechaza una solicitud', async () => {
  const { server, url } = await iniciar(estudianteExiste);
  const creada = await (await json('POST', `${url}/validaciones`, solicitud)).json();
  const res = await json('PATCH', `${url}/validaciones/${creada.id}`, { estado: 'RECHAZADO' });
  assert.strictEqual((await res.json()).estado, 'RECHAZADO');
  server.close();
});

test('estudiante inexistente devuelve 404', async () => {
  const { server, url } = await iniciar(estudianteNoExiste);
  const res = await json('POST', `${url}/validaciones`, solicitud);
  assert.strictEqual(res.status, 404);
  assert.strictEqual((await res.json()).error, 'ESTUDIANTE_NO_ENCONTRADO');
  server.close();
});

test('servicio de estudiantes caído devuelve 503', async () => {
  const { server, url } = await iniciar(servicioCaido);
  const res = await json('POST', `${url}/validaciones`, solicitud);
  assert.strictEqual(res.status, 503);
  server.close();
});

test('datos inválidos devuelven 400', async () => {
  const { server, url } = await iniciar(estudianteExiste);
  const res = await json('POST', `${url}/validaciones`, { estudianteId: 'x' });
  assert.strictEqual(res.status, 400);
  server.close();
});

test('estado inválido en PATCH devuelve 400', async () => {
  const { server, url } = await iniciar(estudianteExiste);
  const creada = await (await json('POST', `${url}/validaciones`, solicitud)).json();
  const res = await json('PATCH', `${url}/validaciones/${creada.id}`, { estado: 'PENDIENTE' });
  assert.strictEqual(res.status, 400);
  server.close();
});

test('estudiante sin solicitud devuelve 404', async () => {
  const { server, url } = await iniciar(estudianteExiste);
  const res = await fetch(`${url}/validaciones/estudiantes/99`);
  assert.strictEqual(res.status, 404);
  server.close();
});
