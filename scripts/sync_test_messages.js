import { createClient } from '@supabase/supabase-js';
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

const supabase = createClient(env['VITE_SUPABASE_URL'], env['VITE_SUPABASE_ANON_KEY']);

async function testIds() {
  const { data: users, error } = await supabase
    .from('users')
    .select('id, email, first_name, last_name')
    .in('email', ['admin@tdc.com', 'vikram.singhania@example.com', 'ananya.deshmukh@example.com']);

  console.log('Users found:', users);

  if (users && users.length >= 2) {
    const u1 = users[0].id;
    const u2 = users[1].id;
    const { error: msgErr } = await supabase.from('messages').insert([
      {
        sender_id: u1,
        receiver_id: u2,
        message: 'Hello from TDC Matchmaker!',
        is_read: true
      }
    ]);
    if (!msgErr) {
      console.log('✅ Realtime messages seeded with live user IDs!');
    } else {
      console.error('Error inserting message:', msgErr.message);
    }
  }
}

testIds();
