const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('src/assets/resume.html', 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

async function loadResume(response) {
  const status = { textContent: 'Opening Resume…' };
  let opened = null;
  await vm.runInNewContext(script, {
    fetch: async () => response,
    TextDecoder,
    Blob,
    URL: { createObjectURL: blob => {
      assert.equal(blob.type, 'application/pdf');
      return 'blob:resume';
    } },
    document: { getElementById: () => status },
    window: { location: { replace: url => { opened = url; } } },
  });
  return { opened, status: status.textContent };
}

(async () => {
  const pdf = new TextEncoder().encode('%PDF-1.7').buffer;
  assert.equal((await loadResume({ ok: true, arrayBuffer: async () => pdf })).opened, 'blob:resume');
  for (const response of [{ ok: false }, { ok: true, arrayBuffer: async () => new ArrayBuffer(0) }]) {
    const result = await loadResume(response);
    assert.equal(result.opened, null);
    assert.match(result.status, /Could not load.*GitHub/);
  }
  console.log('Resume PDF display and failure fallback checks passed');
})();
