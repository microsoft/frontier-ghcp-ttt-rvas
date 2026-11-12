const test = require('node:test');
const assert = require('node:assert/strict');
const { server } = require('../src/server');

function get(path) {
  return new Promise((resolve, reject) => {
    server.listen(0, () => {
      fetch(`http://localhost:${server.address().port}${path}`)
        .then(async (res) => resolve({ status: res.status, body: await res.text() }))
        .catch(reject)
        .finally(() => server.close());
    });
  });
}

test('hello page escapes HTML in the name', async () => {
  const { body } = await get('/hello?name=%3Cscript%3Ealert(1)%3C/script%3E');
  assert.ok(!body.includes('<script>'));
});

test('files route refuses paths outside public', async () => {
  const { status } = await get('/files?name=../package.json');
  assert.equal(status, 400);
});
