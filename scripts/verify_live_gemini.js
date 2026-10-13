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

async function testCall() {
  const models = ['gemini-2.5-flash', 'gemini-3-flash-preview'];
  for (const m of models) {
    try {
      console.log(`Testing model: ${m}...`);
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Respond with only the text: "AI is ready"' }] }]
        })
      });
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log(`Result for ${m}:`, reply ? reply.trim() : JSON.stringify(data).slice(0, 100));
      if (reply) break;
    } catch (e) {
      console.error(e.message);
    }
  }
}

testCall();
