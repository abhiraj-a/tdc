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
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

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

const featured = [
  {
    id: '10000000-0000-0000-0000-000000000001', email: 'vikram.singhania@example.com', password: 'password123', role: 'client',
    first_name: 'Vikramaditya', last_name: 'Singhania', gender: 'Male', dob: '1994-08-14', height_cm: 180, city: 'Mumbai', country: 'India',
    phone: '+91 98201 44556', ug_college: 'IIT Bombay', ug_degree: 'B.Tech CS', company: 'Morgan Stanley', designation: 'VP Quant Tech',
    income: 4800000, marital_status: 'Never Married', status_tag: 'Active', diet: 'Vegetarian', manglik: 'No', want_kids: 'Yes',
    open_to_relocate: 'No', open_to_pets: 'Yes', religion: 'Hindu', caste: 'Marwari', languages: ['English', 'Hindi', 'Gujarati'],
    siblings: '1 Elder Sister', drinking: 'Socially', smoking: 'Never',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    notes: 'Intro call went great! Looking for someone culturally grounded with high intellectual curiosity.'
  },
  {
    id: '10000000-0000-0000-0000-000000000002', email: 'ananya.deshmukh@example.com', password: 'password123', role: 'client',
    first_name: 'Ananya', last_name: 'Deshmukh', gender: 'Female', dob: '1996-03-22', height_cm: 165, city: 'Bengaluru', country: 'India',
    phone: '+91 98801 88992', ug_college: 'BITS Pilani', ug_degree: 'B.E. EEE', company: 'Google India', designation: 'Senior Product Manager',
    income: 3600000, marital_status: 'Never Married', status_tag: 'Active', diet: 'Eggetarian', manglik: 'No', want_kids: 'Yes',
    open_to_relocate: 'Yes', open_to_pets: 'Yes', religion: 'Hindu', caste: 'Deshmukh', languages: ['English', 'Hindi', 'Marathi'],
    siblings: 'Only Child', drinking: 'Socially', smoking: 'Never',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    notes: 'High EQ, articulate. Looking for an ambitious, emotionally secure partner.'
  },
  {
    id: '10000000-0000-0000-0000-000000000003', email: 'rohan.kapoor@example.com', password: 'password123', role: 'client',
    first_name: 'Rohan', last_name: 'Kapoor', gender: 'Male', dob: '1992-11-04', height_cm: 183, city: 'Delhi NCR', country: 'India',
    phone: '+91 98112 33441', ug_college: 'SRCC', ug_degree: 'B.Com (Hons)', company: 'Bain & Company', designation: 'Associate Partner',
    income: 6200000, marital_status: 'Never Married', status_tag: 'Onboarding', diet: 'Non-Vegetarian', manglik: 'No', want_kids: 'Yes',
    open_to_relocate: 'Maybe', open_to_pets: 'Yes', religion: 'Hindu', caste: 'Khatri', languages: ['English', 'Hindi', 'Punjabi'],
    siblings: '1 Younger Brother', drinking: 'Socially', smoking: 'Never',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    notes: 'Completed onboarding documentation. Family is well respected in South Delhi.'
  },
  {
    id: '10000000-0000-0000-0000-000000000004', email: 'radhika.iyer@example.com', password: 'password123', role: 'client',
    first_name: 'Radhika', last_name: 'Iyer', gender: 'Female', dob: '1997-09-18', height_cm: 162, city: 'Mumbai', country: 'India',
    phone: '+91 98211 99887', ug_college: 'NLSIU Bangalore', ug_degree: 'B.A. LL.B', company: 'Khaitan & Co', designation: 'Senior Associate (M&A)',
    income: 2800000, marital_status: 'Never Married', status_tag: 'Matches Sent', diet: 'Vegetarian', manglik: 'No', want_kids: 'Yes',
    open_to_relocate: 'No', open_to_pets: 'No', religion: 'Hindu', caste: 'Iyer', languages: ['English', 'Tamil', 'Hindi'],
    siblings: '1 Elder Brother', drinking: 'Never', smoking: 'Never',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    notes: 'Sent 3 matches yesterday. Very focused on family values and vegetarian lifestyle.'
  },
  {
    id: '10000000-0000-0000-0000-000000000005', email: 'kabir.mehta@example.com', password: 'password123', role: 'client',
    first_name: 'Kabir', last_name: 'Mehta', gender: 'Male', dob: '1995-02-10', height_cm: 176, city: 'Pune', country: 'India',
    phone: '+91 97654 22119', ug_college: 'COEP Pune', ug_degree: 'B.Tech Mech', company: 'Zomato', designation: 'Director Product Growth',
    income: 3800000, marital_status: 'Never Married', status_tag: 'Meeting Scheduled', diet: 'Jain', manglik: 'No', want_kids: 'Yes',
    open_to_relocate: 'Yes', open_to_pets: 'Maybe', religion: 'Jain', caste: 'Shwetambar', languages: ['English', 'Hindi', 'Gujarati'],
    siblings: '1 Younger Sister', drinking: 'Never', smoking: 'Never',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    notes: 'Follow-up call scheduled for Friday. Needs partner with Jain dietary preferences.'
  },
  {
    id: '10000000-0000-0000-0000-000000000006', email: 'shreya.bansal@example.com', password: 'password123', role: 'client',
    first_name: 'Shreya', last_name: 'Bansal', gender: 'Female', dob: '1995-12-05', height_cm: 168, city: 'Gurgaon', country: 'India',
    phone: '+91 98104 55667', ug_college: 'LSR Delhi', ug_degree: 'B.A. Economics', company: 'McKinsey & Co', designation: 'Engagement Manager',
    income: 4200000, marital_status: 'Never Married', status_tag: 'Active', diet: 'Vegetarian', manglik: 'No', want_kids: 'Maybe',
    open_to_relocate: 'Yes', open_to_pets: 'Yes', religion: 'Hindu', caste: 'Aggarwal', languages: ['English', 'Hindi'],
    siblings: 'None', drinking: 'Socially', smoking: 'Never',
    avatar_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    notes: 'Values mutual intellectual respect, progressive mindset, and global exposure.'
  },
  {
    id: '10000000-0000-0000-0000-000000000007', email: 'arjun.nambiar@example.com', password: 'password123', role: 'client',
    first_name: 'Arjun', last_name: 'Nambiar', gender: 'Male', dob: '1993-06-25', height_cm: 185, city: 'Hyderabad', country: 'India',
    phone: '+91 98490 66778', ug_college: 'NIT Warangal', ug_degree: 'B.Tech EE', company: 'Microsoft', designation: 'Principal Architect',
    income: 5500000, marital_status: 'Never Married', status_tag: 'On Hold', diet: 'Non-Vegetarian', manglik: 'No', want_kids: 'Yes',
    open_to_relocate: 'Yes', open_to_pets: 'Yes', religion: 'Hindu', caste: 'Nair', languages: ['English', 'Malayalam', 'Hindi'],
    siblings: '1 Sister', drinking: 'Socially', smoking: 'Never',
    avatar_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    notes: 'Temporarily on hold till end of month due to overseas product launch.'
  },
  {
    id: '10000000-0000-0000-0000-000000000008', email: 'meera.sengupta@example.com', password: 'password123', role: 'client',
    first_name: 'Meera', last_name: 'Sengupta', gender: 'Female', dob: '1998-04-12', height_cm: 160, city: 'Kolkata', country: 'India',
    phone: '+91 98300 77889', ug_college: 'Presidency Univ', ug_degree: 'B.Sc Econ', company: 'ITC Limited', designation: 'Brand Manager',
    income: 2200000, marital_status: 'Never Married', status_tag: 'Active', diet: 'Non-Vegetarian', manglik: 'No', want_kids: 'Yes',
    open_to_relocate: 'Yes', open_to_pets: 'Yes', religion: 'Hindu', caste: 'Kayastha', languages: ['English', 'Bengali', 'Hindi'],
    siblings: '1 Elder Brother', drinking: 'Socially', smoking: 'Never',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    notes: 'Creative and family oriented. Wants partner who respects literary and cultural pursuits.'
  }
];

const pool = [];

// 56 Female Pool Candidates
for (let i = 0; i < 56; i++) {
  const fName = femaleFirstNames[i % femaleFirstNames.length];
  const lName = lastNames[(i * 3 + 1) % lastNames.length];
  const bYear = 1993 + (i % 9);
  const bMonth = String((i % 12) + 1).padStart(2, '0');
  const bDay = String((i % 27) + 1).padStart(2, '0');
  const height = 155 + ((i * 3) % 18);
  const income = 1200000 + ((i * 270000) % 3600000);

  pool.push({
    id: `20000000-0000-0000-0000-${String(i + 1).padStart(12, '0')}`,
    email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i + 1}@pool.tdc.com`,
    password: 'password123',
    role: 'client',
    status_tag: 'Active',
    avatar_url: femaleAvatars[i % femaleAvatars.length],
    first_name: fName,
    last_name: lName,
    gender: 'Female',
    dob: `${bYear}-${bMonth}-${bDay}`,
    height_cm: height,
    country: i % 10 === 0 ? 'UK' : 'India',
    city: cities[i % cities.length],
    phone: `+91 98${String(10000000 + i * 8421).slice(0, 8)}`,
    ug_college: colleges[i % colleges.length],
    ug_degree: i % 2 === 0 ? 'B.Tech / B.E.' : 'B.A. / B.Com',
    company: companies[i % companies.length],
    designation: designations[i % designations.length],
    income: income,
    marital_status: i === 7 ? 'Divorced' : 'Never Married',
    languages: ['English', 'Hindi'],
    siblings: i % 3 === 0 ? '1 Brother' : 'None',
    religion: religions[i % religions.length],
    caste: lastNames[(i * 2) % lastNames.length],
    diet: diets[i % diets.length],
    manglik: i % 7 === 0 ? 'Yes' : 'No',
    drinking: i % 3 === 0 ? 'Never' : 'Socially',
    smoking: 'Never',
    want_kids: i % 5 === 0 ? 'Maybe' : 'Yes',
    open_to_relocate: i % 4 === 0 ? 'Maybe' : 'Yes',
    open_to_pets: i % 6 === 0 ? 'No' : 'Yes',
    notes: `TDC Verified Candidate Pool Profile #${i + 1}`
  });
}

// 56 Male Pool Candidates
for (let i = 0; i < 56; i++) {
  const fName = maleFirstNames[i % maleFirstNames.length];
  const lName = lastNames[(i * 2 + 5) % lastNames.length];
  const bYear = 1991 + (i % 9);
  const bMonth = String((i % 12) + 1).padStart(2, '0');
  const bDay = String((i % 27) + 1).padStart(2, '0');
  const height = 172 + ((i * 3) % 18);
  const income = 1800000 + ((i * 340000) % 4500000);

  pool.push({
    id: `30000000-0000-0000-0000-${String(i + 1).padStart(12, '0')}`,
    email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i + 1}@pool.tdc.com`,
    password: 'password123',
    role: 'client',
    status_tag: 'Active',
    avatar_url: maleAvatars[i % maleAvatars.length],
    first_name: fName,
    last_name: lName,
    gender: 'Male',
    dob: `${bYear}-${bMonth}-${bDay}`,
    height_cm: height,
    country: i % 11 === 0 ? 'US' : 'India',
    city: cities[(i + 3) % cities.length],
    phone: `+91 97${String(10000000 + i * 9411).slice(0, 8)}`,
    ug_college: colleges[(i + 2) % colleges.length],
    ug_degree: i % 2 === 0 ? 'B.Tech / B.E.' : 'B.Sc / B.Com',
    company: companies[(i + 3) % companies.length],
    designation: designations[(i + 1) % designations.length],
    income: income,
    marital_status: i === 12 ? 'Divorced' : 'Never Married',
    languages: ['English', 'Hindi'],
    siblings: i % 3 === 0 ? '1 Sister' : 'None',
    religion: religions[(i + 1) % religions.length],
    caste: lastNames[(i * 3) % lastNames.length],
    diet: diets[(i + 1) % diets.length],
    manglik: i % 8 === 0 ? 'Yes' : 'No',
    drinking: i % 4 === 0 ? 'Never' : 'Socially',
    smoking: 'Never',
    want_kids: i % 6 === 0 ? 'Maybe' : 'Yes',
    open_to_relocate: i % 3 === 0 ? 'Maybe' : 'Yes',
    open_to_pets: i % 5 === 0 ? 'Maybe' : 'Yes',
    notes: `TDC Verified Candidate Pool Profile #${i + 1}`
  });
}

const allProfiles = [...featured, ...pool];

async function seedSupabase() {
  console.log(`Starting push of ${allProfiles.length} profiles to Supabase...`);

  // Insert in chunks of 25 to respect payload limits
  const chunkSize = 25;
  for (let i = 0; i < allProfiles.length; i += chunkSize) {
    const chunk = allProfiles.slice(i, i + chunkSize);
    const { error } = await supabase
      .from('users')
      .upsert(chunk, { onConflict: 'email' });

    if (error) {
      console.error(`Error uploading chunk ${i / chunkSize + 1}:`, error.message);
    } else {
      console.log(`Uploaded profiles ${i + 1} to ${Math.min(i + chunkSize, allProfiles.length)}`);
    }
  }

  // Check final count
  const { count, error: countErr } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true });

  if (!countErr) {
    console.log(`\n🎉 Success! Total users in Supabase database now: ${count}`);
  }
}

seedSupabase();
