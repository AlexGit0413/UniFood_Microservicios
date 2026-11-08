const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { initDb, cerrarDb } = require('../src/db');
const app = require('../src/app');

test.beforeEach(() => {
  cerrarDb();
  initDb(':memory:');
});

test.after(() => {
  cerrarDb();
});

test('POST /estudiantes registra un nuevo estudiante exitosamente (201)', async () => {
  const server = app.listen(0, '127.0.0.1');
  try {
    await once(server, 'listening');
    const port = server.address().port;

    const payload = {
      nombres: 'Jose Leonardo',
      apellidos: 'Cruz Gonzales',
      universidad: 'Universidad Continental',
      codigoUniversitario: 'U20261001'
    };

    const res = await fetch(`http://127.0.0.1:${port}/estudiantes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    assert.equal(res.status, 201);
    const data = await res.json();
    assert.equal(typeof data.id, 'number');
    assert.equal(data.nombres, payload.nombres);
    assert.equal(data.apellidos, payload.apellidos);
    assert.equal(data.universidad, payload.universidad);
    assert.equal(data.codigoUniversitario, payload.codigoUniversitario);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('POST /estudiantes rechaza peticion con campos faltantes o vacios (400)', async () => {
  const server = app.listen(0, '127.0.0.1');
  try {
    await once(server, 'listening');
    const port = server.address().port;

    const casosInvalidos = [
      {},
      { nombres: '', apellidos: 'Cruz', universidad: 'Continental', codigoUniversitario: 'U001' },
      { nombres: 'Jose', apellidos: '   ', universidad: 'Continental', codigoUniversitario: 'U001' },
      { nombres: 'Jose', apellidos: 'Cruz', universidad: '', codigoUniversitario: 'U001' },
      { nombres: 'Jose', apellidos: 'Cruz', universidad: 'Continental', codigoUniversitario: '   ' }
    ];

    for (const body of casosInvalidos) {
      const res = await fetch(`http://127.0.0.1:${port}/estudiantes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      assert.equal(res.status, 400);
      const data = await res.json();
      assert.equal(data.error, 'CAMPOS_INVALIDOS');
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('POST /estudiantes rechaza codigo universitario duplicado (409)', async () => {
  const server = app.listen(0, '127.0.0.1');
  try {
    await once(server, 'listening');
    const port = server.address().port;

    const payload = {
      nombres: 'Estudiante',
      apellidos: 'Uno',
      universidad: 'Universidad Continental',
      codigoUniversitario: 'U99999'
    };

    const res1 = await fetch(`http://127.0.0.1:${port}/estudiantes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    assert.equal(res1.status, 201);

    const res2 = await fetch(`http://127.0.0.1:${port}/estudiantes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombres: 'Estudiante',
        apellidos: 'Dos',
        universidad: 'Universidad Continental',
        codigoUniversitario: 'U99999'
      })
    });
    assert.equal(res2.status, 409);
    const data = await res2.json();
    assert.equal(data.error, 'CODIGO_DUPLICADO');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('GET /estudiantes/:id devuelve datos del estudiante existente (200)', async () => {
  const server = app.listen(0, '127.0.0.1');
  try {
    await once(server, 'listening');
    const port = server.address().port;

    const payload = {
      nombres: 'Leonardo',
      apellidos: 'Cruz',
      universidad: 'Universidad Continental',
      codigoUniversitario: 'U20261002'
    };

    const postRes = await fetch(`http://127.0.0.1:${port}/estudiantes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const creado = await postRes.json();

    const getRes = await fetch(`http://127.0.0.1:${port}/estudiantes/${creado.id}`);
    assert.equal(getRes.status, 200);
    const data = await getRes.json();
    assert.equal(data.id, creado.id);
    assert.equal(data.codigoUniversitario, payload.codigoUniversitario);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test('GET /estudiantes/:id devuelve 404 para estudiante no encontrado o id invalido', async () => {
  const server = app.listen(0, '127.0.0.1');
  try {
    await once(server, 'listening');
    const port = server.address().port;

    const resInexistente = await fetch(`http://127.0.0.1:${port}/estudiantes/999999`);
    assert.equal(resInexistente.status, 404);
    const dataInexistente = await resInexistente.json();
    assert.equal(dataInexistente.error, 'ESTUDIANTE_NO_ENCONTRADO');

    const resInvalido = await fetch(`http://127.0.0.1:${port}/estudiantes/abc`);
    assert.equal(resInvalido.status, 404);
    const dataInvalido = await resInvalido.json();
    assert.equal(dataInvalido.error, 'ESTUDIANTE_NO_ENCONTRADO');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
