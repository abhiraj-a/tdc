import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read .env
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

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Anon key in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAndSeed() {
  console.log(`Connecting to Supabase: ${supabaseUrl}...`);
  
  // Test if users table exists
  const { data: existing, error: checkError } = await supabase
    .from('users')
    .select('id, email, first_name')
    .limit(5);

  if (checkError) {
    console.error('Error connecting to `users` table:', checkError.message);
    if (checkError.message.includes('relation "public.users" does not exist') || checkError.code === '42P01') {
      console.log('\n--> NOTICE: The `users` table does not exist in your Supabase project yet.');
      console.log('--> Please run `schema.sql` in your Supabase Dashboard -> SQL Editor first.');
    }
    return;
  }

  console.log(`Found ${existing.length} existing users in Supabase.`);
  
  // Import mock users
  const { ALL_USERS, INITIAL_MESSAGES } = await import('../src/data/mockUsers.js').catch(async () => {
    // If ts cannot be imported directly, we parse seed_data.sql or use JSON
    return { ALL_USERS: null, INITIAL_MESSAGES: null };
  });

  if (!ALL_USERS) {
    console.log('Seeder script ready. Checking profile count...');
  }
}

checkAndSeed();
