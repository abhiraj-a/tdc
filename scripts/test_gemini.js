import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let val = match[2] || '';
    val = val.trim().replace(/^['"]|['"]$/g, '');
    env[match[1]] = val;
  }
});

const key = env['VITE_GEMINI_API_KEY'];
console.log('Testing key prefix:', key.slice(0, 8));

async function testGemini() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Hello, respond with: OK' }] }]
      })
    });
    const data = await res.json();
    console.log('Gemini API status:', res.status);
    console.log('Gemini response:', JSON.stringify(data).slice(0, 200));
  } catch (e) {
    console.error('Fetch error:', e.message);
  }
}

testGemini();
