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

async function seedMessages() {
  const msgs = [
    {
      sender_id: '00000000-0000-0000-0000-000000000001',
      receiver_id: '10000000-0000-0000-0000-000000000001',
      message: 'Hi Vikram! Welcome to TDC. I have curated two exceptional matches matching your criteria in Mumbai.',
      is_read: true
    },
    {
      sender_id: '10000000-0000-0000-0000-000000000001',
      receiver_id: '00000000-0000-0000-0000-000000000001',
      message: 'Thanks Pooja! Looking forward to reviewing them. Please make sure they are open to staying in South Bombay.',
      is_read: true
    },
    {
      sender_id: '10000000-0000-0000-0000-000000000001',
      receiver_id: '10000000-0000-0000-0000-000000000002',
      message: 'Hi Ananya, Pooja from TDC introduced our profiles. I loved reading about your work at Google and passion for travel!',
      is_read: true
    },
    {
      sender_id: '10000000-0000-0000-0000-000000000002',
      receiver_id: '10000000-0000-0000-0000-000000000001',
      message: 'Hi Vikram! Wonderful to connect with you. Morgan Stanley quant tech sounds super fascinating! Are you visiting Bangalore anytime soon?',
      is_read: false
    }
  ];

  const { error } = await supabase.from('messages').insert(msgs);
  if (error) {
    console.error('Error seeding messages:', error.message);
  } else {
    console.log('🎉 Successfully seeded chat messages in Supabase!');
  }
}

seedMessages();
