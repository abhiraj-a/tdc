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

async function inspectAuth() {
  console.log('Inspecting Supabase Auth config...');
  // Check if we can sign in with OTP / magic link or check if we can verify
  const res = await fetch(`${env['VITE_SUPABASE_URL']}/auth/v1/settings`, {
    headers: {
      apikey: env['VITE_SUPABASE_ANON_KEY']
    }
  });
  if (res.ok) {
    const json = await res.json();
    console.log('Auth settings:', json);
  } else {
    console.log('Settings error:', res.status, await res.text());
  }
}

inspectAuth();
