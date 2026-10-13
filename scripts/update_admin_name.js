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

async function updateAdminName() {
  const { data, error } = await supabase
    .from('users')
    .update({
      first_name: 'admintdc',
      last_name: ''
    })
    .eq('email', 'admin@tdc.com')
    .select();

  if (error) {
    console.error('Error updating admin name:', error.message);
  } else {
    console.log('✅ Successfully updated admin in Supabase:', data);
  }
}

updateAdminName();
