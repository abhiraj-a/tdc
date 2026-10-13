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

async function getRoster() {
  const { data, error } = await supabase
    .from('users')
    .select('id, first_name, last_name, gender, city, designation, company, income, status_tag, ug_college, email, dob')
    .eq('role', 'client')
    .not('email', 'like', '%@pool.tdc.com%')
    .order('first_name');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Roster Clients count:', data.length);
  console.log(JSON.stringify(data, null, 2));
}

getRoster();
