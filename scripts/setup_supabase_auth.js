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

async function setupAuth() {
  console.log('Testing Supabase Auth signIn for admin@tdc.com...');

  // Try signing in
  const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
    email: 'admin@tdc.com',
    password: 'admin123'
  });

  if (!signInErr && signInData?.session) {
    console.log('✅ Supabase Auth user already exists and signed in successfully!');
    console.log('Session user ID:', signInData.user.id);
    return;
  }

  console.log('Sign-in failed (user likely not created in auth.users yet):', signInErr?.message);
  console.log('Creating auth user via signUp...');

  // Create user in Supabase Auth
  const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
    email: 'admin@tdc.com',
    password: 'admin123',
    options: {
      data: {
        first_name: 'admintdc',
        role: 'matchmaker'
      }
    }
  });

  if (signUpErr) {
    console.error('❌ Error creating Supabase Auth user:', signUpErr.message);
  } else {
    console.log('✅ Supabase Auth user created successfully!');
    console.log('User ID:', signUpData?.user?.id);
    console.log('Session:', Boolean(signUpData?.session));
  }
}

setupAuth();
