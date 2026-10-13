import fs from 'fs';
import { ALL_USERS, INITIAL_MESSAGES } from '../src/data/mockUsers.js';

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

function escapeArray(arr) {
  if (!arr || !arr.length) return "ARRAY[]::text[]";
  const items = arr.map(item => `'${String(item).replace(/'/g, "''")}'`).join(', ');
  return `ARRAY[${items}]`;
}

let sql = `-- TDC Matchmaker MVP - Supabase Data Seeding Script
-- Contains Matchmaker, 8 Featured Clients, and 112+ Candidate Pool Profiles (opposite genders)
-- Run this in Supabase Dashboard -> SQL Editor

`;

for (const user of ALL_USERS) {
  sql += `INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  ${escapeSql(user.id)},
  ${escapeSql(user.email)},
  ${escapeSql(user.password || 'password123')},
  ${escapeSql(user.role)},
  ${escapeSql(user.status_tag)},
  ${escapeSql(user.avatar_url)},
  ${escapeSql(user.first_name)},
  ${escapeSql(user.last_name)},
  ${escapeSql(user.gender)},
  ${escapeSql(user.dob)},
  ${user.height_cm},
  ${escapeSql(user.country)},
  ${escapeSql(user.city)},
  ${escapeSql(user.phone)},
  ${escapeSql(user.ug_college)},
  ${escapeSql(user.ug_degree)},
  ${escapeSql(user.company)},
  ${escapeSql(user.designation)},
  ${user.income},
  ${escapeSql(user.marital_status)},
  ${escapeArray(user.languages)},
  ${escapeSql(user.siblings)},
  ${escapeSql(user.religion)},
  ${escapeSql(user.caste)},
  ${escapeSql(user.diet)},
  ${escapeSql(user.manglik)},
  ${escapeSql(user.drinking)},
  ${escapeSql(user.smoking)},
  ${escapeSql(user.want_kids)},
  ${escapeSql(user.open_to_relocate)},
  ${escapeSql(user.open_to_pets)},
  ${escapeSql(user.notes)}
) ON CONFLICT (email) DO UPDATE SET 
  status_tag = EXCLUDED.status_tag,
  notes = EXCLUDED.notes;

`;
}

// Add messages
sql += `\n-- Seed Messages\n`;
for (const msg of INITIAL_MESSAGES) {
  sql += `INSERT INTO public.messages (id, created_at, sender_id, receiver_id, message, is_read)
VALUES (
  gen_random_uuid(),
  ${escapeSql(msg.created_at)},
  ${escapeSql(msg.sender_id)},
  ${escapeSql(msg.receiver_id)},
  ${escapeSql(msg.message)},
  ${msg.is_read}
) ON CONFLICT DO NOTHING;\n`;
}

fs.writeFileSync('seed_data.sql', sql, 'utf8');
console.log('Successfully generated seed_data.sql with ' + ALL_USERS.length + ' users and ' + INITIAL_MESSAGES.length + ' messages!');
