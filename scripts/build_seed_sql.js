import fs from 'fs';

const femaleAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
];

const maleAvatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80'
];

const femaleFirstNames = [
  'Aarohi', 'Ishita', 'Pooja', 'Tanvi', 'Ananya', 'Rhea', 'Divya', 'Sanya', 'Neha', 'Kavya',
  'Megha', 'Priyanka', 'Simran', 'Trisha', 'Nandini', 'Aditi', 'Natasha', 'Rupali', 'Shalini', 'Sneha',
  'Tara', 'Vidya', 'Alisha', 'Bhavna', 'Charulata', 'Deepika', 'Esha', 'Gauri', 'Harini', 'Isha',
  'Juhi', 'Kriti', 'Lavanya', 'Mahima', 'Nidhi', 'Oindrila', 'Pallavi', 'Ritu', 'Sakshi', 'Tanya',
  'Urvi', 'Vaishnavi', 'Yamini', 'Zoya', 'Akanksha', 'Bhumika', 'Chitrangada', 'Devika', 'Garima', 'Himani',
  'Jasmine', 'Karishma', 'Mallika', 'Nupur', 'Prerna', 'Radha', 'Srishti', 'Tejaswini'
];

const maleFirstNames = [
  'Aarav', 'Aditya', 'Akash', 'Aman', 'Aniruddh', 'Arnav', 'Aryan', 'Ayush', 'Chaitanya', 'Devansh',
  'Dhruv', 'Gaurav', 'Harsh', 'Ishaan', 'Karan', 'Kunal', 'Manish', 'Nakul', 'Naveen', 'Nikhil',
  'Pranav', 'Prateek', 'Raghav', 'Rahul', 'Rishi', 'Rohit', 'Sahil', 'Sameer', 'Samarth', 'Siddharth',
  'Tarun', 'Utkarsh', 'Varun', 'Vedant', 'Vikrant', 'Yash', 'Zeeshan', 'Abhimanyu', 'Bhuvan', 'Chirag',
  'Deepak', 'Eashan', 'Farhan', 'Girish', 'Hemanth', 'Jayant', 'Kartik', 'Lokesh', 'Mohit', 'Neeraj',
  'Omkar', 'Parth', 'Rajesh', 'Sanket', 'Tushar', 'Umesh', 'Vihan', 'Vivek'
];

const lastNames = [
  'Agarwal', 'Bhatia', 'Chopra', 'Desai', 'Garg', 'Gupta', 'Iyer', 'Jain', 'Kapoor', 'Khanna',
  'Kulkarni', 'Malhotra', 'Mehta', 'Mishra', 'Mukherjee', 'Nair', 'Patel', 'Rao', 'Reddy', 'Saxena',
  'Sen', 'Sharma', 'Singh', 'Sinha', 'Trivedi', 'Varma', 'Verma', 'Yadav', 'Bose', 'Chatterjee'
];

const cities = ['Mumbai', 'Bengaluru', 'Delhi NCR', 'Pune', 'Hyderabad', 'Gurgaon', 'Chennai', 'Kolkata', 'Ahmedabad', 'Chandigarh'];
const colleges = ['IIT Bombay', 'IIT Delhi', 'BITS Pilani', 'SRCC, Delhi University', 'St. Xavier’s College', 'IIM Ahmedabad', 'ISB Hyderabad', 'Lady Shri Ram (LSR)', 'COEP Pune', 'NLSIU Bangalore'];
const companies = ['Google', 'Microsoft', 'McKinsey & Co', 'Goldman Sachs', 'Amazon', 'Swiggy', 'Bain & Company', 'Morgan Stanley', 'Khaitan & Co', 'Tata Sons', 'Freshworks', 'Zomato'];
const designations = ['Senior Software Engineer', 'Product Manager', 'Management Consultant', 'Investment Associate', 'Corporate Counsel', 'Data Scientist', 'VP Engineering', 'Brand Strategist'];
const religions = ['Hindu', 'Hindu', 'Hindu', 'Jain', 'Sikh', 'Christian'];
const diets = ['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Jain'];

function esc(val) {
  if (val === null || val === undefined) return 'NULL';
  return `'${String(val).replace(/'/g, "''")}'`;
}

function escArr(arr) {
  if (!arr || !arr.length) return "ARRAY['English'::text, 'Hindi'::text]";
  return `ARRAY[${arr.map(x => `'${x.replace(/'/g, "''")}'`).join(', ')}]`;
}

let sql = `-- ==========================================================
-- TDC MATCHMAKER MVP: COMPLETE DATABASE SEED SCRIPT
-- Includes:
-- 1. Matchmaker: admin@tdc.com / admin123
-- 2. 8 Featured Clients (Vikram, Ananya, Rohan, Radhika, Kabir, Shreya, Arjun, Meera)
-- 3. 110+ Pool Profiles of Opposite Genders
-- 4. Initial Seed Chat Messages
-- Run in Supabase SQL Editor AFTER schema.sql
-- ==========================================================

-- 1. Insert Matchmaker
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '00000000-0000-0000-0000-000000000001', 'admin@tdc.com', 'admin123', 'matchmaker', 'Active',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'Pooja', 'Sharma', 'Female', '1992-05-15', 165, 'India', 'Mumbai', '+91 98200 11223',
  'St. Xavier’s College, Mumbai', 'B.A. Psychology', 'The Date Crew (TDC)', 'Principal Matchmaker',
  1800000, 'Never Married', ARRAY['English', 'Hindi', 'Marathi'], '1 Younger Brother',
  'Hindu', 'Brahmin', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Maybe', 'Yes',
  'Lead matchmaker account for demo.'
) ON CONFLICT (email) DO NOTHING;

-- 2. Insert 8 Featured Clients
`;

const featured = [
  {
    id: '10000000-0000-0000-0000-000000000001', email: 'vikram.singhania@example.com', first_name: 'Vikramaditya', last_name: 'Singhania',
    gender: 'Male', dob: '1994-08-14', height_cm: 180, city: 'Mumbai', phone: '+91 98201 44556', ug_college: 'IIT Bombay', ug_degree: 'B.Tech CS',
    company: 'Morgan Stanley', designation: 'VP Quant Tech', income: 4800000, marital_status: 'Never Married', status_tag: 'Active',
    diet: 'Vegetarian', manglik: 'No', want_kids: 'Yes', open_to_relocate: 'No', open_to_pets: 'Yes', religion: 'Hindu', caste: 'Marwari',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    notes: 'Intro call went great! Looking for someone culturally grounded with high intellectual curiosity.'
  },
  {
    id: '10000000-0000-0000-0000-000000000002', email: 'ananya.deshmukh@example.com', first_name: 'Ananya', last_name: 'Deshmukh',
    gender: 'Female', dob: '1996-03-22', height_cm: 165, city: 'Bengaluru', phone: '+91 98801 88992', ug_college: 'BITS Pilani', ug_degree: 'B.E. EEE',
    company: 'Google India', designation: 'Senior Product Manager', income: 3600000, marital_status: 'Never Married', status_tag: 'Active',
    diet: 'Eggetarian', manglik: 'No', want_kids: 'Yes', open_to_relocate: 'Yes', open_to_pets: 'Yes', religion: 'Hindu', caste: 'Deshmukh',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    notes: 'High EQ, articulate. Looking for an ambitious, emotionally secure partner.'
  },
  {
    id: '10000000-0000-0000-0000-000000000003', email: 'rohan.kapoor@example.com', first_name: 'Rohan', last_name: 'Kapoor',
    gender: 'Male', dob: '1992-11-04', height_cm: 183, city: 'Delhi NCR', phone: '+91 98112 33441', ug_college: 'SRCC', ug_degree: 'B.Com (Hons)',
    company: 'Bain & Company', designation: 'Associate Partner', income: 6200000, marital_status: 'Never Married', status_tag: 'Onboarding',
    diet: 'Non-Vegetarian', manglik: 'No', want_kids: 'Yes', open_to_relocate: 'Maybe', open_to_pets: 'Yes', religion: 'Hindu', caste: 'Khatri',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    notes: 'Completed onboarding documentation. Family is well respected in South Delhi.'
  },
  {
    id: '10000000-0000-0000-0000-000000000004', email: 'radhika.iyer@example.com', first_name: 'Radhika', last_name: 'Iyer',
    gender: 'Female', dob: '1997-09-18', height_cm: 162, city: 'Mumbai', phone: '+91 98211 99887', ug_college: 'NLSIU Bangalore', ug_degree: 'B.A. LL.B',
    company: 'Khaitan & Co', designation: 'Senior Associate (M&A)', income: 2800000, marital_status: 'Never Married', status_tag: 'Matches Sent',
    diet: 'Vegetarian', manglik: 'No', want_kids: 'Yes', open_to_relocate: 'No', open_to_pets: 'No', religion: 'Hindu', caste: 'Iyer',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    notes: 'Sent 3 matches yesterday. Very focused on family values and vegetarian lifestyle.'
  },
  {
    id: '10000000-0000-0000-0000-000000000005', email: 'kabir.mehta@example.com', first_name: 'Kabir', last_name: 'Mehta',
    gender: 'Male', dob: '1995-02-10', height_cm: 176, city: 'Pune', phone: '+91 97654 22119', ug_college: 'COEP Pune', ug_degree: 'B.Tech Mech',
    company: 'Zomato', designation: 'Director Product Growth', income: 3800000, marital_status: 'Never Married', status_tag: 'Meeting Scheduled',
    diet: 'Jain', manglik: 'No', want_kids: 'Yes', open_to_relocate: 'Yes', open_to_pets: 'Maybe', religion: 'Jain', caste: 'Shwetambar',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    notes: 'Follow-up call scheduled for Friday. Needs partner with Jain dietary preferences.'
  },
  {
    id: '10000000-0000-0000-0000-000000000006', email: 'shreya.bansal@example.com', first_name: 'Shreya', last_name: 'Bansal',
    gender: 'Female', dob: '1995-12-05', height_cm: 168, city: 'Gurgaon', phone: '+91 98104 55667', ug_college: 'LSR Delhi', ug_degree: 'B.A. Economics',
    company: 'McKinsey & Co', designation: 'Engagement Manager', income: 4200000, marital_status: 'Never Married', status_tag: 'Active',
    diet: 'Vegetarian', manglik: 'No', want_kids: 'Maybe', open_to_relocate: 'Yes', open_to_pets: 'Yes', religion: 'Hindu', caste: 'Aggarwal',
    avatar_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    notes: 'Values mutual intellectual respect, progressive mindset, and global exposure.'
  },
  {
    id: '10000000-0000-0000-0000-000000000007', email: 'arjun.nambiar@example.com', first_name: 'Arjun', last_name: 'Nambiar',
    gender: 'Male', dob: '1993-06-25', height_cm: 185, city: 'Hyderabad', phone: '+91 98490 66778', ug_college: 'NIT Warangal', ug_degree: 'B.Tech EE',
    company: 'Microsoft', designation: 'Principal Architect', income: 5500000, marital_status: 'Never Married', status_tag: 'On Hold',
    diet: 'Non-Vegetarian', manglik: 'No', want_kids: 'Yes', open_to_relocate: 'Yes', open_to_pets: 'Yes', religion: 'Hindu', caste: 'Nair',
    avatar_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    notes: 'Temporarily on hold till end of month due to overseas product launch.'
  },
  {
    id: '10000000-0000-0000-0000-000000000008', email: 'meera.sengupta@example.com', first_name: 'Meera', last_name: 'Sengupta',
    gender: 'Female', dob: '1998-04-12', height_cm: 160, city: 'Kolkata', phone: '+91 98300 77889', ug_college: 'Presidency Univ', ug_degree: 'B.Sc Econ',
    company: 'ITC Limited', designation: 'Brand Manager', income: 2200000, marital_status: 'Never Married', status_tag: 'Active',
    diet: 'Non-Vegetarian', manglik: 'No', want_kids: 'Yes', open_to_relocate: 'Yes', open_to_pets: 'Yes', religion: 'Hindu', caste: 'Kayastha',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    notes: 'Creative and family oriented. Wants partner who respects literary and cultural pursuits.'
  }
];

for (const c of featured) {
  sql += `INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '${c.id}', '${c.email}', 'password123', 'client', '${c.status_tag}', '${c.avatar_url}',
  '${c.first_name}', '${c.last_name}', '${c.gender}', '${c.dob}', ${c.height_cm}, 'India',
  '${c.city}', '${c.phone}', '${c.ug_college}', '${c.ug_degree}', '${c.company}', '${c.designation}',
  ${c.income}, '${c.marital_status}', ARRAY['English', 'Hindi'], '1 Sibling', '${c.religion}',
  '${c.caste}', '${c.diet}', '${c.manglik}', 'Socially', 'Never', '${c.want_kids}', '${c.open_to_relocate}',
  '${c.open_to_pets}', ${esc(c.notes)}
) ON CONFLICT (email) DO NOTHING;\n`;
}

// 3. Generate 56 Female Pool Candidates
sql += `\n-- 3. 56 Verified Female Pool Profiles (Opposite gender pool)\n`;
for (let i = 0; i < 56; i++) {
  const fName = femaleFirstNames[i % femaleFirstNames.length];
  const lName = lastNames[(i * 3 + 1) % lastNames.length];
  const bYear = 1993 + (i % 9);
  const bMonth = String((i % 12) + 1).padStart(2, '0');
  const bDay = String((i % 27) + 1).padStart(2, '0');
  const height = 155 + ((i * 3) % 18);
  const income = 1200000 + ((i * 270000) % 3600000);
  const uuid = `20000000-0000-0000-0000-${String(i + 1).padStart(12, '0')}`;
  const email = `${fName.toLowerCase()}.${lName.toLowerCase()}${i + 1}@pool.tdc.com`;
  const avatar = femaleAvatars[i % femaleAvatars.length];
  const city = cities[i % cities.length];
  const college = colleges[i % colleges.length];
  const comp = companies[i % companies.length];
  const desig = designations[i % designations.length];
  const diet = diets[i % diets.length];
  const rel = religions[i % religions.length];

  sql += `INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '${uuid}', '${email}', 'password123', 'client', 'Active', '${avatar}',
  '${fName}', '${lName}', 'Female', '${bYear}-${bMonth}-${bDay}', ${height}, 'India',
  '${city}', '+91 98${String(10000000 + i * 8421).slice(0, 8)}', '${college}', 'B.Tech / B.A.',
  '${comp}', '${desig}', ${income}, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  '${rel}', '${lName}', '${diet}', '${i % 7 === 0 ? 'Yes' : 'No'}', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #${i + 1}'
) ON CONFLICT (email) DO NOTHING;\n`;
}

// 4. Generate 56 Male Pool Candidates
sql += `\n-- 4. 56 Verified Male Pool Profiles (Opposite gender pool)\n`;
for (let i = 0; i < 56; i++) {
  const fName = maleFirstNames[i % maleFirstNames.length];
  const lName = lastNames[(i * 2 + 5) % lastNames.length];
  const bYear = 1991 + (i % 9);
  const bMonth = String((i % 12) + 1).padStart(2, '0');
  const bDay = String((i % 27) + 1).padStart(2, '0');
  const height = 172 + ((i * 3) % 18);
  const income = 1800000 + ((i * 340000) % 4500000);
  const uuid = `30000000-0000-0000-0000-${String(i + 1).padStart(12, '0')}`;
  const email = `${fName.toLowerCase()}.${lName.toLowerCase()}${i + 1}@pool.tdc.com`;
  const avatar = maleAvatars[i % maleAvatars.length];
  const city = cities[(i + 3) % cities.length];
  const college = colleges[(i + 2) % colleges.length];
  const comp = companies[(i + 3) % companies.length];
  const desig = designations[(i + 1) % designations.length];
  const diet = diets[(i + 1) % diets.length];
  const rel = religions[(i + 1) % religions.length];

  sql += `INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '${uuid}', '${email}', 'password123', 'client', 'Active', '${avatar}',
  '${fName}', '${lName}', 'Male', '${bYear}-${bMonth}-${bDay}', ${height}, 'India',
  '${city}', '+91 97${String(10000000 + i * 9411).slice(0, 8)}', '${college}', 'B.Tech / B.Sc',
  '${comp}', '${desig}', ${income}, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  '${rel}', '${lName}', '${diet}', '${i % 8 === 0 ? 'Yes' : 'No'}', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #${i + 1}'
) ON CONFLICT (email) DO NOTHING;\n`;
}

// 5. Initial Messages
sql += `\n-- 5. Seed Realtime Chat Messages
INSERT INTO public.messages (id, created_at, sender_id, receiver_id, message, is_read)
VALUES
(gen_random_uuid(), NOW() - INTERVAL '2 days', '00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Hi Vikram! Welcome to TDC. I have curated two exceptional matches matching your criteria in Mumbai.', true),
(gen_random_uuid(), NOW() - INTERVAL '1 day', '10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Thanks Pooja! Looking forward to reviewing them. Please make sure they are open to staying in South Bombay.', true),
(gen_random_uuid(), NOW() - INTERVAL '12 hours', '00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Absolutely, noted. I have applied that filter directly in your profile.', true),
(gen_random_uuid(), NOW() - INTERVAL '6 hours', '10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'Hi Ananya, Pooja from TDC introduced our profiles. I loved reading about your work at Google and passion for travel!', true),
(gen_random_uuid(), NOW() - INTERVAL '2 hours', '10000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Hi Vikram! Wonderful to connect with you. Morgan Stanley quant tech sounds super fascinating! Are you visiting Bangalore anytime soon?', false)
ON CONFLICT DO NOTHING;
`;

fs.writeFileSync('seed_data.sql', sql, 'utf8');
console.log('Successfully generated seed_data.sql with 120+ profiles and messages!');
