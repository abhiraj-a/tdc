import { User, Message } from '../types';

// Curated high-res avatar photos for realistic experience
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
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80'
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
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80'
];

export const MATCHMAKER_USER: User = {
  id: '00000000-0000-0000-0000-000000000001',
  email: 'admin@tdc.com',
  password: 'admin123',
  role: 'matchmaker',
  status_tag: 'Active',
  avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  first_name: 'Pooja',
  last_name: 'Sharma',
  gender: 'Female',
  dob: '1992-05-15',
  height_cm: 165,
  country: 'India',
  city: 'Mumbai',
  phone: '+91 98200 11223',
  ug_college: 'St. Xavier’s College, Mumbai',
  ug_degree: 'B.A. Psychology',
  company: 'The Date Crew (TDC)',
  designation: 'Principal Matchmaker & Relationship Lead',
  income: 1800000,
  marital_status: 'Never Married',
  languages: ['English', 'Hindi', 'Marathi'],
  siblings: '1 Younger Brother',
  religion: 'Hindu',
  caste: 'Brahmin',
  diet: 'Vegetarian',
  manglik: 'No',
  drinking: 'Socially',
  smoking: 'Never',
  want_kids: 'Yes',
  open_to_relocate: 'Maybe',
  open_to_pets: 'Yes',
  notes: 'Internal TDC matchmaker account managing Tier-1 ultra-HNI clients.',
  about_me: 'Head of Matchmaking at TDC. Passionate about values-first matchmaking.'
};

// 8 Featured clients managed by matchmaker
export const FEATURED_CLIENTS: User[] = [
  {
    id: '10000000-0000-0000-0000-000000000001',
    email: 'vikram.singhania@example.com',
    password: 'password123',
    role: 'client',
    status_tag: 'Active',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    first_name: 'Vikramaditya',
    last_name: 'Singhania',
    gender: 'Male',
    dob: '1994-08-14', // 31 years old
    height_cm: 180, // ~5'11"
    country: 'India',
    city: 'Mumbai',
    phone: '+91 98201 44556',
    ug_college: 'IIT Bombay',
    ug_degree: 'B.Tech Computer Science',
    company: 'Morgan Stanley',
    designation: 'Vice President - Quantitative Tech',
    income: 4800000, // 48 LPA
    marital_status: 'Never Married',
    languages: ['English', 'Hindi', 'Gujarati'],
    siblings: '1 Elder Sister (Married)',
    religion: 'Hindu',
    caste: 'Marwari / Vaishya',
    diet: 'Vegetarian',
    manglik: 'No',
    drinking: 'Socially',
    smoking: 'Never',
    want_kids: 'Yes',
    open_to_relocate: 'No', // Settled in Mumbai
    open_to_pets: 'Yes',
    notes: 'Intro call went great! Looking for someone culturally grounded with high intellectual curiosity. Prefers Mumbai-based partner.',
    about_me: 'Fintech builder by day, weekend marathoner and indie coffee enthusiast.'
  },
  {
    id: '10000000-0000-0000-0000-000000000002',
    email: 'ananya.deshmukh@example.com',
    password: 'password123',
    role: 'client',
    status_tag: 'Active',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    first_name: 'Ananya',
    last_name: 'Deshmukh',
    gender: 'Female',
    dob: '1996-03-22', // 29 years old
    height_cm: 165, // 5'5"
    country: 'India',
    city: 'Bengaluru',
    phone: '+91 98801 88992',
    ug_college: 'BITS Pilani',
    ug_degree: 'B.E. Electrical & Electronics',
    company: 'Google India',
    designation: 'Senior Product Manager',
    income: 3600000, // 36 LPA
    marital_status: 'Never Married',
    languages: ['English', 'Hindi', 'Marathi'],
    siblings: 'Only Child',
    religion: 'Hindu',
    caste: 'Open / Inter-caste fine',
    diet: 'Eggetarian',
    manglik: 'No',
    drinking: 'Socially',
    smoking: 'Never',
    want_kids: 'Yes',
    open_to_relocate: 'Yes',
    open_to_pets: 'Yes',
    notes: 'High EQ, extremely articulate. Looking for an ambitious, emotionally secure partner with strong conversational chemistry.',
    about_me: 'Product builder, classical Kathak dancer, avid traveler having visited 18 countries.'
  },
  {
    id: '10000000-0000-0000-0000-000000000003',
    email: 'rohan.kapoor@example.com',
    password: 'password123',
    role: 'client',
    status_tag: 'Onboarding',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    first_name: 'Rohan',
    last_name: 'Kapoor',
    gender: 'Male',
    dob: '1992-11-04', // 33 years old
    height_cm: 183, // 6'0"
    country: 'India',
    city: 'Delhi NCR',
    phone: '+91 98112 33441',
    ug_college: 'SRCC, Delhi University',
    ug_degree: 'B.Com (Hons)',
    company: 'Bain & Company',
    designation: 'Associate Partner',
    income: 6200000, // 62 LPA
    marital_status: 'Never Married',
    languages: ['English', 'Hindi', 'Punjabi'],
    siblings: '1 Younger Brother',
    religion: 'Hindu',
    caste: 'Khatri',
    diet: 'Non-Vegetarian',
    manglik: 'No',
    drinking: 'Socially',
    smoking: 'Never',
    want_kids: 'Yes',
    open_to_relocate: 'Maybe',
    open_to_pets: 'Yes',
    notes: 'Completed onboarding documentation. Family is well respected in South Delhi. Seeking partner with similar professional stature.',
    about_me: 'Strategy consultant, amateur golfer, and lover of modern architecture.'
  },
  {
    id: '10000000-0000-0000-0000-000000000004',
    email: 'radhika.iyer@example.com',
    password: 'password123',
    role: 'client',
    status_tag: 'Matches Sent',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    first_name: 'Radhika',
    last_name: 'Iyer',
    gender: 'Female',
    dob: '1997-09-18', // 28 years old
    height_cm: 162, // 5'4"
    country: 'India',
    city: 'Mumbai',
    phone: '+91 98211 99887',
    ug_college: 'National Law School (NLSIU)',
    ug_degree: 'B.A. LL.B (Hons)',
    company: 'Khaitan & Co',
    designation: 'Senior Associate (M&A)',
    income: 2800000, // 28 LPA
    marital_status: 'Never Married',
    languages: ['English', 'Tamil', 'Hindi'],
    siblings: '1 Elder Brother (US)',
    religion: 'Hindu',
    caste: 'Iyer',
    diet: 'Vegetarian',
    manglik: 'No',
    drinking: 'Never',
    smoking: 'Never',
    want_kids: 'Yes',
    open_to_relocate: 'No',
    open_to_pets: 'No',
    notes: 'Sent 3 matches yesterday. Very focused on family values and vegetarian lifestyle. Prefers law, finance, or leadership backgrounds.',
    about_me: 'Corporate lawyer with a passion for Carnatic music, filter coffee, and weekend pottery.'
  },
  {
    id: '10000000-0000-0000-0000-000000000005',
    email: 'kabir.mehta@example.com',
    password: 'password123',
    role: 'client',
    status_tag: 'Meeting Scheduled',
    avatar_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    first_name: 'Kabir',
    last_name: 'Mehta',
    gender: 'Male',
    dob: '1995-02-10', // 30 years old
    height_cm: 176, // 5'9"
    country: 'India',
    city: 'Pune',
    phone: '+91 97654 22119',
    ug_college: 'COEP Pune',
    ug_degree: 'B.Tech Mechanical',
    company: 'Zomato / Blinkit',
    designation: 'Director of Product Growth',
    income: 3800000, // 38 LPA
    marital_status: 'Never Married',
    languages: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    siblings: '1 Younger Sister',
    religion: 'Jain',
    caste: 'Shwetambar',
    diet: 'Jain',
    manglik: 'No',
    drinking: 'Never',
    smoking: 'Never',
    want_kids: 'Yes',
    open_to_relocate: 'Yes',
    open_to_pets: 'Maybe',
    notes: 'Follow-up call scheduled for Friday. Needs partner with Jain dietary preferences.',
    about_me: 'Startup operator, board game designer, passionate about clean eating.'
  },
  {
    id: '10000000-0000-0000-0000-000000000006',
    email: 'shreya.bansal@example.com',
    password: 'password123',
    role: 'client',
    status_tag: 'Active',
    avatar_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    first_name: 'Shreya',
    last_name: 'Bansal',
    gender: 'Female',
    dob: '1995-12-05', // 30 years old
    height_cm: 168, // 5'6"
    country: 'India',
    city: 'Gurgaon',
    phone: '+91 98104 55667',
    ug_college: 'Lady Shri Ram College (LSR)',
    ug_degree: 'B.A. Economics (Hons)',
    company: 'McKinsey & Company',
    designation: 'Engagement Manager',
    income: 4200000, // 42 LPA
    marital_status: 'Never Married',
    languages: ['English', 'Hindi'],
    siblings: 'None',
    religion: 'Hindu',
    caste: 'Bania / Aggarwal',
    diet: 'Vegetarian',
    manglik: 'No',
    drinking: 'Socially',
    smoking: 'Never',
    want_kids: 'Maybe',
    open_to_relocate: 'Yes',
    open_to_pets: 'Yes',
    notes: 'Values mutual intellectual respect, progressive mindset, and global exposure.',
    about_me: 'Consultant, modern art collector, certified scuba diver.'
  },
  {
    id: '10000000-0000-0000-0000-000000000007',
    email: 'arjun.nambiar@example.com',
    password: 'password123',
    role: 'client',
    status_tag: 'On Hold',
    avatar_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    first_name: 'Arjun',
    last_name: 'Nambiar',
    gender: 'Male',
    dob: '1993-06-25', // 32 years old
    height_cm: 185, // 6'1"
    country: 'India',
    city: 'Hyderabad',
    phone: '+91 98490 66778',
    ug_college: 'NIT Warangal',
    ug_degree: 'B.Tech Electrical',
    company: 'Microsoft',
    designation: 'Principal Software Architect',
    income: 5500000, // 55 LPA
    marital_status: 'Never Married',
    languages: ['English', 'Malayalam', 'Hindi', 'Telugu'],
    siblings: '1 Sister',
    religion: 'Hindu',
    caste: 'Nair',
    diet: 'Non-Vegetarian',
    manglik: 'No',
    drinking: 'Socially',
    smoking: 'Never',
    want_kids: 'Yes',
    open_to_relocate: 'Yes',
    open_to_pets: 'Yes',
    notes: 'Temporarily on hold till end of month due to overseas product launch.',
    about_me: 'Tech architect, vinyl collector, high-altitude trekker.'
  },
  {
    id: '10000000-0000-0000-0000-000000000008',
    email: 'meera.sengupta@example.com',
    password: 'password123',
    role: 'client',
    status_tag: 'Active',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    first_name: 'Meera',
    last_name: 'Sengupta',
    gender: 'Female',
    dob: '1998-04-12', // 27 years old
    height_cm: 160, // 5'3"
    country: 'India',
    city: 'Kolkata',
    phone: '+91 98300 77889',
    ug_college: 'Presidency University',
    ug_degree: 'B.Sc Economics',
    company: 'ITC Limited',
    designation: 'Brand Manager',
    income: 2200000, // 22 LPA
    marital_status: 'Never Married',
    languages: ['English', 'Bengali', 'Hindi'],
    siblings: '1 Elder Brother',
    religion: 'Hindu',
    caste: 'Brahmin / Kayastha',
    diet: 'Non-Vegetarian',
    manglik: 'No',
    drinking: 'Socially',
    smoking: 'Never',
    want_kids: 'Yes',
    open_to_relocate: 'Yes',
    open_to_pets: 'Yes',
    notes: 'Very creative and family oriented. Wants partner who respects literary and cultural pursuits.',
    about_me: 'Brand marketer, indie filmmaker, passionate about heritage gastronomy.'
  }
];

// Helper to generate 55+ Male and 55+ Female dummy profiles
const femaleFirstNames = [
  'Aarohi', 'Ishita', 'Pooja', 'Tanvi', 'Ananya', 'Rhea', 'Divya', 'Sanya', 'Neha', 'Kavya',
  'Megha', 'Priyanka', 'Simran', 'Trisha', 'Nandini', 'Aditi', 'Natasha', 'Rupali', 'Shalini', 'Sneha',
  'Tara', 'Vidya', 'Alisha', 'Bhavna', 'Charulata', 'Deepika', 'Esha', 'Gauri', 'Harini', 'Isha',
  'Juhi', 'Kriti', 'Lavanya', 'Mahima', 'Nidhi', 'Oindrila', 'Pallavi', 'Ritu', 'Sakshi', 'Tanya',
  'Urvi', 'Vaishnavi', 'Yamini', 'Zoya', 'Akanksha', 'Bhumika', 'Chitrangada', 'Devika', 'Garima', 'Himani',
  'Jasmine', 'Karishma', 'Mallika', 'Nupur', 'Prerna', 'Radha', 'Srishti', 'Tejaswini', 'Vasundhara', 'Zara'
];

const maleFirstNames = [
  'Aarav', 'Aditya', 'Akash', 'Aman', 'Aniruddh', 'Arnav', 'Aryan', 'Ayush', 'Chaitanya', 'Devansh',
  'Dhruv', 'Gaurav', 'Harsh', 'Ishaan', 'Karan', 'Kunal', 'Manish', 'Nakul', 'Naveen', 'Nikhil',
  'Pranav', 'Prateek', 'Raghav', 'Rahul', 'Rishi', 'Rohit', 'Sahil', 'Sameer', 'Samarth', 'Siddharth',
  'Tarun', 'Utkarsh', 'Varun', 'Vedant', 'Vikrant', 'Yash', 'Zeeshan', 'Abhimanyu', 'Bhuvan', 'Chirag',
  'Deepak', 'Eashan', 'Farhan', 'Girish', 'Hemanth', 'Jayant', 'Kartik', 'Lokesh', 'Mohit', 'Neeraj',
  'Omkar', 'Parth', 'Rajesh', 'Sanket', 'Tushar', 'Umesh', 'Vihan', 'Vivek', 'Yuvraj', 'Zubin'
];

const lastNames = [
  'Agarwal', 'Bhatia', 'Chopra', 'Desai', 'Garg', 'Gupta', 'Iyer', 'Jain', 'Kapoor', 'Khanna',
  'Kulkarni', 'Malhotra', 'Mehta', 'Mishra', 'Mukherjee', 'Nair', 'Patel', 'Rao', 'Reddy', 'Saxena',
  'Sen', 'Sharma', 'Singh', 'Sinha', 'Trivedi', 'Varma', 'Verma', 'Yadav', 'Bose', 'Chatterjee',
  'Choudhary', 'Ghosh', 'Joshi', 'Menon', 'Pillai', 'Rathore', 'Shah', 'Shetty', 'Venkatesh', 'Walia'
];

const cities = [
  'Mumbai', 'Bengaluru', 'Delhi NCR', 'Pune', 'Hyderabad', 'Gurgaon', 
  'Chennai', 'Kolkata', 'Ahmedabad', 'Chandigarh', 'London, UK', 'San Francisco, US'
];

const colleges = [
  'IIT Bombay', 'IIT Delhi', 'BITS Pilani', 'SRCC, Delhi University', 'St. Xavier’s College',
  'IIM Ahmedabad', 'ISB Hyderabad', 'Lady Shri Ram (LSR)', 'COEP Pune', 'Christ University',
  'NLSIU Bangalore', 'NIFT Delhi', 'Columbia University', 'London Business School', 'St. Stephen’s'
];

const companies = [
  'Google', 'Microsoft', 'McKinsey & Co', 'Goldman Sachs', 'Amazon', 'Swiggy',
  'Bain & Company', 'Morgan Stanley', 'Khaitan & Co', 'Apollo Hospitals', 'Tata Sons',
  'Unilever', 'Adobe', 'Stripe', 'Boston Consulting Group', 'Zomato', 'Freshworks'
];

const designations = [
  'Senior Software Engineer', 'Product Manager', 'Management Consultant', 'Investment Associate',
  'Corporate Counsel', 'Data Scientist', 'VP Engineering', 'Brand Strategist', 'Clinical Specialist',
  'Chief of Staff', 'UX Design Lead', 'Private Equity Analyst', 'Operations Director'
];

const religions = ['Hindu', 'Hindu', 'Hindu', 'Jain', 'Sikh', 'Christian'];
const diets: ('Vegetarian' | 'Non-Vegetarian' | 'Eggetarian' | 'Jain')[] = [
  'Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Jain'
];

function generatePoolProfiles(): User[] {
  const pool: User[] = [];

  // Generate 56 Female Pool Candidates
  for (let i = 0; i < 56; i++) {
    const fName = femaleFirstNames[i % femaleFirstNames.length];
    const lName = lastNames[(i * 3 + 1) % lastNames.length];
    const birthYear = 1993 + (i % 9); // 1993 to 2001 (Ages 25 to 33)
    const birthMonth = String((i % 12) + 1).padStart(2, '0');
    const birthDay = String((i % 27) + 1).padStart(2, '0');
    const height = 155 + ((i * 3) % 18); // 155cm to 172cm
    const income = 1200000 + ((i * 270000) % 3600000); // 12 LPA to 48 LPA

    pool.push({
      id: `20000000-0000-0000-0000-${String(i + 1).padStart(12, '0')}`,
      email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i + 1}@pool.tdc.com`,
      role: 'client',
      status_tag: 'Active',
      avatar_url: femaleAvatars[i % femaleAvatars.length],
      first_name: fName,
      last_name: lName,
      gender: 'Female',
      dob: `${birthYear}-${birthMonth}-${birthDay}`,
      height_cm: height,
      country: i % 10 === 0 ? 'UK' : 'India',
      city: cities[i % cities.length],
      phone: `+91 98${String(10000000 + i * 8421).slice(0, 8)}`,
      ug_college: colleges[i % colleges.length],
      ug_degree: i % 2 === 0 ? 'B.Tech / B.E.' : 'B.A. / B.Com / B.Sc',
      company: companies[i % companies.length],
      designation: designations[i % designations.length],
      income: income,
      marital_status: i === 7 ? 'Divorced' : 'Never Married',
      languages: ['English', 'Hindi', i % 3 === 0 ? 'Marathi' : 'Gujarati'],
      siblings: i % 3 === 0 ? '1 Brother' : (i % 2 === 0 ? '1 Sister' : 'None'),
      religion: religions[i % religions.length],
      caste: lastNames[(i * 2) % lastNames.length],
      diet: diets[i % diets.length],
      manglik: i % 7 === 0 ? 'Yes' : 'No',
      drinking: i % 3 === 0 ? 'Never' : 'Socially',
      smoking: 'Never',
      want_kids: i % 5 === 0 ? 'Maybe' : 'Yes',
      open_to_relocate: i % 4 === 0 ? 'Maybe' : 'Yes',
      open_to_pets: i % 6 === 0 ? 'No' : 'Yes',
      notes: `Pool candidate #${i + 1} verified by TDC intake team.`,
      about_me: `Passionate professional working in ${cities[i % cities.length]}. Enjoys weekend cafes, travel, and fitness.`
    });
  }

  // Generate 56 Male Pool Candidates
  for (let i = 0; i < 56; i++) {
    const fName = maleFirstNames[i % maleFirstNames.length];
    const lName = lastNames[(i * 2 + 5) % lastNames.length];
    const birthYear = 1991 + (i % 9); // 1991 to 1999 (Ages 27 to 35)
    const birthMonth = String((i % 12) + 1).padStart(2, '0');
    const birthDay = String((i % 27) + 1).padStart(2, '0');
    const height = 172 + ((i * 3) % 18); // 172cm to 189cm
    const income = 1800000 + ((i * 340000) % 4500000); // 18 LPA to 62 LPA

    pool.push({
      id: `30000000-0000-0000-0000-${String(i + 1).padStart(12, '0')}`,
      email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i + 1}@pool.tdc.com`,
      role: 'client',
      status_tag: 'Active',
      avatar_url: maleAvatars[i % maleAvatars.length],
      first_name: fName,
      last_name: lName,
      gender: 'Male',
      dob: `${birthYear}-${birthMonth}-${birthDay}`,
      height_cm: height,
      country: i % 11 === 0 ? 'US' : 'India',
      city: cities[(i + 3) % cities.length],
      phone: `+91 97${String(10000000 + i * 9411).slice(0, 8)}`,
      ug_college: colleges[(i + 2) % colleges.length],
      ug_degree: i % 2 === 0 ? 'B.Tech / B.E.' : 'B.Sc / B.Com (Hons)',
      company: companies[(i + 3) % companies.length],
      designation: designations[(i + 1) % designations.length],
      income: income,
      marital_status: i === 12 ? 'Divorced' : 'Never Married',
      languages: ['English', 'Hindi', i % 4 === 0 ? 'Punjabi' : 'Tamil'],
      siblings: i % 3 === 0 ? '1 Sister' : (i % 2 === 0 ? '1 Brother' : 'None'),
      religion: religions[(i + 1) % religions.length],
      caste: lastNames[(i * 3) % lastNames.length],
      diet: diets[(i + 1) % diets.length],
      manglik: i % 8 === 0 ? 'Yes' : 'No',
      drinking: i % 4 === 0 ? 'Never' : 'Socially',
      smoking: i % 9 === 0 ? 'Occasionally' : 'Never',
      want_kids: i % 6 === 0 ? 'Maybe' : 'Yes',
      open_to_relocate: i % 3 === 0 ? 'Maybe' : 'Yes',
      open_to_pets: i % 5 === 0 ? 'Maybe' : 'Yes',
      notes: `Verified male pool profile #${i + 1} with checked background credentials.`,
      about_me: `Engineering & leadership specialist based in ${cities[(i + 3) % cities.length]}. Enthusiastic about sports and tech.`
    });
  }

  return pool;
}

export const POOL_PROFILES: User[] = generatePoolProfiles();

export const ALL_USERS: User[] = [
  MATCHMAKER_USER,
  ...FEATURED_CLIENTS,
  ...POOL_PROFILES
];

// Seed chat conversations so the chat is lively from day 1
export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    sender_id: MATCHMAKER_USER.id,
    receiver_id: FEATURED_CLIENTS[0].id, // Vikram Singhania
    message: 'Hi Vikram! Welcome to TDC. I have curated two exceptional matches matching your criteria in Mumbai.',
    is_read: true
  },
  {
    id: 'm2',
    created_at: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
    sender_id: FEATURED_CLIENTS[0].id,
    receiver_id: MATCHMAKER_USER.id,
    message: 'Thanks Pooja! Looking forward to reviewing them. Please make sure they are open to staying in South Bombay.',
    is_read: true
  },
  {
    id: 'm3',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    sender_id: MATCHMAKER_USER.id,
    receiver_id: FEATURED_CLIENTS[0].id,
    message: 'Absolutely, noted. I have applied that filter directly in your profile.',
    is_read: true
  },
  {
    id: 'm4',
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    sender_id: FEATURED_CLIENTS[0].id,
    receiver_id: FEATURED_CLIENTS[1].id, // Vikram to Ananya
    message: 'Hi Ananya, Pooja from TDC introduced our profiles. I loved reading about your work at Google and passion for travel!',
    is_read: true
  },
  {
    id: 'm5',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    sender_id: FEATURED_CLIENTS[1].id,
    receiver_id: FEATURED_CLIENTS[0].id, // Ananya to Vikram
    message: 'Hi Vikram! Wonderful to connect with you. Morgan Stanley quant tech sounds super fascinating! Are you visiting Bangalore anytime soon?',
    is_read: false
  }
];
