-- ==========================================================
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
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '10000000-0000-0000-0000-000000000001', 'vikram.singhania@example.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'Vikramaditya', 'Singhania', 'Male', '1994-08-14', 180, 'India',
  'Mumbai', '+91 98201 44556', 'IIT Bombay', 'B.Tech CS', 'Morgan Stanley', 'VP Quant Tech',
  4800000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling', 'Hindu',
  'Marwari', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'No',
  'Yes', 'Intro call went great! Looking for someone culturally grounded with high intellectual curiosity.'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '10000000-0000-0000-0000-000000000002', 'ananya.deshmukh@example.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'Ananya', 'Deshmukh', 'Female', '1996-03-22', 165, 'India',
  'Bengaluru', '+91 98801 88992', 'BITS Pilani', 'B.E. EEE', 'Google India', 'Senior Product Manager',
  3600000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling', 'Hindu',
  'Deshmukh', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes',
  'Yes', 'High EQ, articulate. Looking for an ambitious, emotionally secure partner.'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '10000000-0000-0000-0000-000000000003', 'rohan.kapoor@example.com', 'password123', 'client', 'Onboarding', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'Rohan', 'Kapoor', 'Male', '1992-11-04', 183, 'India',
  'Delhi NCR', '+91 98112 33441', 'SRCC', 'B.Com (Hons)', 'Bain & Company', 'Associate Partner',
  6200000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling', 'Hindu',
  'Khatri', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Maybe',
  'Yes', 'Completed onboarding documentation. Family is well respected in South Delhi.'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '10000000-0000-0000-0000-000000000004', 'radhika.iyer@example.com', 'password123', 'client', 'Matches Sent', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  'Radhika', 'Iyer', 'Female', '1997-09-18', 162, 'India',
  'Mumbai', '+91 98211 99887', 'NLSIU Bangalore', 'B.A. LL.B', 'Khaitan & Co', 'Senior Associate (M&A)',
  2800000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling', 'Hindu',
  'Iyer', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'No',
  'No', 'Sent 3 matches yesterday. Very focused on family values and vegetarian lifestyle.'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '10000000-0000-0000-0000-000000000005', 'kabir.mehta@example.com', 'password123', 'client', 'Meeting Scheduled', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
  'Kabir', 'Mehta', 'Male', '1995-02-10', 176, 'India',
  'Pune', '+91 97654 22119', 'COEP Pune', 'B.Tech Mech', 'Zomato', 'Director Product Growth',
  3800000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling', 'Jain',
  'Shwetambar', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes',
  'Maybe', 'Follow-up call scheduled for Friday. Needs partner with Jain dietary preferences.'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '10000000-0000-0000-0000-000000000006', 'shreya.bansal@example.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
  'Shreya', 'Bansal', 'Female', '1995-12-05', 168, 'India',
  'Gurgaon', '+91 98104 55667', 'LSR Delhi', 'B.A. Economics', 'McKinsey & Co', 'Engagement Manager',
  4200000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling', 'Hindu',
  'Aggarwal', 'Vegetarian', 'No', 'Socially', 'Never', 'Maybe', 'Yes',
  'Yes', 'Values mutual intellectual respect, progressive mindset, and global exposure.'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '10000000-0000-0000-0000-000000000007', 'arjun.nambiar@example.com', 'password123', 'client', 'On Hold', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
  'Arjun', 'Nambiar', 'Male', '1993-06-25', 185, 'India',
  'Hyderabad', '+91 98490 66778', 'NIT Warangal', 'B.Tech EE', 'Microsoft', 'Principal Architect',
  5500000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling', 'Hindu',
  'Nair', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes',
  'Yes', 'Temporarily on hold till end of month due to overseas product launch.'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '10000000-0000-0000-0000-000000000008', 'meera.sengupta@example.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
  'Meera', 'Sengupta', 'Female', '1998-04-12', 160, 'India',
  'Kolkata', '+91 98300 77889', 'Presidency Univ', 'B.Sc Econ', 'ITC Limited', 'Brand Manager',
  2200000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling', 'Hindu',
  'Kayastha', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes',
  'Yes', 'Creative and family oriented. Wants partner who respects literary and cultural pursuits.'
) ON CONFLICT (email) DO NOTHING;

-- 3. 56 Verified Female Pool Profiles (Opposite gender pool)
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000001', 'aarohi.bhatia1@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'Aarohi', 'Bhatia', 'Female', '1993-01-01', 155, 'India',
  'Mumbai', '+91 9810000000', 'IIT Bombay', 'B.Tech / B.A.',
  'Google', 'Senior Software Engineer', 1200000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Bhatia', 'Vegetarian', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #1'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000002', 'ishita.garg2@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  'Ishita', 'Garg', 'Female', '1994-02-02', 158, 'India',
  'Bengaluru', '+91 9810008421', 'IIT Delhi', 'B.Tech / B.A.',
  'Microsoft', 'Product Manager', 1470000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Garg', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #2'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000003', 'pooja.jain3@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
  'Pooja', 'Jain', 'Female', '1995-03-03', 161, 'India',
  'Delhi NCR', '+91 9810016842', 'BITS Pilani', 'B.Tech / B.A.',
  'McKinsey & Co', 'Management Consultant', 1740000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Jain', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #3'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000004', 'tanvi.kulkarni4@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
  'Tanvi', 'Kulkarni', 'Female', '1996-04-04', 164, 'India',
  'Pune', '+91 9810025263', 'SRCC, Delhi University', 'B.Tech / B.A.',
  'Goldman Sachs', 'Investment Associate', 2010000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Kulkarni', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #4'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000005', 'ananya.mishra5@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80',
  'Ananya', 'Mishra', 'Female', '1997-05-05', 167, 'India',
  'Hyderabad', '+91 9810033684', 'St. Xavier’s College', 'B.Tech / B.A.',
  'Amazon', 'Corporate Counsel', 2280000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Mishra', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #5'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000006', 'rhea.patel6@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  'Rhea', 'Patel', 'Female', '1998-06-06', 170, 'India',
  'Gurgaon', '+91 9810042105', 'IIM Ahmedabad', 'B.Tech / B.A.',
  'Swiggy', 'Data Scientist', 2550000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Patel', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #6'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000007', 'divya.saxena7@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&auto=format&fit=crop&q=80',
  'Divya', 'Saxena', 'Female', '1999-07-07', 155, 'India',
  'Chennai', '+91 9810050526', 'ISB Hyderabad', 'B.Tech / B.A.',
  'Bain & Company', 'VP Engineering', 2820000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Saxena', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #7'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000008', 'sanya.singh8@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
  'Sanya', 'Singh', 'Female', '2000-08-08', 158, 'India',
  'Kolkata', '+91 9810058947', 'Lady Shri Ram (LSR)', 'B.Tech / B.A.',
  'Morgan Stanley', 'Brand Strategist', 3090000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Singh', 'Jain', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #8'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000009', 'neha.varma9@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&auto=format&fit=crop&q=80',
  'Neha', 'Varma', 'Female', '2001-09-09', 161, 'India',
  'Ahmedabad', '+91 9810067368', 'COEP Pune', 'B.Tech / B.A.',
  'Khaitan & Co', 'Senior Software Engineer', 3360000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Varma', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #9'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000010', 'kavya.bose10@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
  'Kavya', 'Bose', 'Female', '1993-10-10', 164, 'India',
  'Chandigarh', '+91 9810075789', 'NLSIU Bangalore', 'B.Tech / B.A.',
  'Tata Sons', 'Product Manager', 3630000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Bose', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #10'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000011', 'megha.bhatia11@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80',
  'Megha', 'Bhatia', 'Female', '1994-11-11', 167, 'India',
  'Mumbai', '+91 9810084210', 'IIT Bombay', 'B.Tech / B.A.',
  'Freshworks', 'Management Consultant', 3900000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Bhatia', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #11'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000012', 'priyanka.garg12@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'Priyanka', 'Garg', 'Female', '1995-12-12', 170, 'India',
  'Bengaluru', '+91 9810092631', 'IIT Delhi', 'B.Tech / B.A.',
  'Zomato', 'Investment Associate', 4170000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Garg', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #12'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000013', 'simran.jain13@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'Simran', 'Jain', 'Female', '1996-01-13', 155, 'India',
  'Delhi NCR', '+91 9810101052', 'BITS Pilani', 'B.Tech / B.A.',
  'Google', 'Corporate Counsel', 4440000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Jain', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #13'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000014', 'trisha.kulkarni14@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  'Trisha', 'Kulkarni', 'Female', '1997-02-14', 158, 'India',
  'Pune', '+91 9810109473', 'SRCC, Delhi University', 'B.Tech / B.A.',
  'Microsoft', 'Data Scientist', 4710000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Kulkarni', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #14'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000015', 'nandini.mishra15@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
  'Nandini', 'Mishra', 'Female', '1998-03-15', 161, 'India',
  'Hyderabad', '+91 9810117894', 'St. Xavier’s College', 'B.Tech / B.A.',
  'McKinsey & Co', 'VP Engineering', 1380000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Mishra', 'Eggetarian', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #15'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000016', 'aditi.patel16@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
  'Aditi', 'Patel', 'Female', '1999-04-16', 164, 'India',
  'Gurgaon', '+91 9810126315', 'IIM Ahmedabad', 'B.Tech / B.A.',
  'Goldman Sachs', 'Brand Strategist', 1650000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Patel', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #16'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000017', 'natasha.saxena17@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80',
  'Natasha', 'Saxena', 'Female', '2000-05-17', 167, 'India',
  'Chennai', '+91 9810134736', 'ISB Hyderabad', 'B.Tech / B.A.',
  'Amazon', 'Senior Software Engineer', 1920000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Saxena', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #17'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000018', 'rupali.singh18@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  'Rupali', 'Singh', 'Female', '2001-06-18', 170, 'India',
  'Kolkata', '+91 9810143157', 'Lady Shri Ram (LSR)', 'B.Tech / B.A.',
  'Swiggy', 'Product Manager', 2190000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Singh', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #18'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000019', 'shalini.varma19@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&auto=format&fit=crop&q=80',
  'Shalini', 'Varma', 'Female', '1993-07-19', 155, 'India',
  'Ahmedabad', '+91 9810151578', 'COEP Pune', 'B.Tech / B.A.',
  'Bain & Company', 'Management Consultant', 2460000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Varma', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #19'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000020', 'sneha.bose20@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
  'Sneha', 'Bose', 'Female', '1994-08-20', 158, 'India',
  'Chandigarh', '+91 9810159999', 'NLSIU Bangalore', 'B.Tech / B.A.',
  'Morgan Stanley', 'Investment Associate', 2730000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Bose', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #20'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000021', 'tara.bhatia21@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&auto=format&fit=crop&q=80',
  'Tara', 'Bhatia', 'Female', '1995-09-21', 161, 'India',
  'Mumbai', '+91 9810168420', 'IIT Bombay', 'B.Tech / B.A.',
  'Khaitan & Co', 'Corporate Counsel', 3000000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Bhatia', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #21'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000022', 'vidya.garg22@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
  'Vidya', 'Garg', 'Female', '1996-10-22', 164, 'India',
  'Bengaluru', '+91 9810176841', 'IIT Delhi', 'B.Tech / B.A.',
  'Tata Sons', 'Data Scientist', 3270000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Garg', 'Non-Vegetarian', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #22'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000023', 'alisha.jain23@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80',
  'Alisha', 'Jain', 'Female', '1997-11-23', 167, 'India',
  'Delhi NCR', '+91 9810185262', 'BITS Pilani', 'B.Tech / B.A.',
  'Freshworks', 'VP Engineering', 3540000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Jain', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #23'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000024', 'bhavna.kulkarni24@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'Bhavna', 'Kulkarni', 'Female', '1998-12-24', 170, 'India',
  'Pune', '+91 9810193683', 'SRCC, Delhi University', 'B.Tech / B.A.',
  'Zomato', 'Brand Strategist', 3810000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Kulkarni', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #24'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000025', 'charulata.mishra25@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'Charulata', 'Mishra', 'Female', '1999-01-25', 155, 'India',
  'Hyderabad', '+91 9810202104', 'St. Xavier’s College', 'B.Tech / B.A.',
  'Google', 'Senior Software Engineer', 4080000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Mishra', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #25'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000026', 'deepika.patel26@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  'Deepika', 'Patel', 'Female', '2000-02-26', 158, 'India',
  'Gurgaon', '+91 9810210525', 'IIM Ahmedabad', 'B.Tech / B.A.',
  'Microsoft', 'Product Manager', 4350000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Patel', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #26'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000027', 'esha.saxena27@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
  'Esha', 'Saxena', 'Female', '2001-03-27', 161, 'India',
  'Chennai', '+91 9810218946', 'ISB Hyderabad', 'B.Tech / B.A.',
  'McKinsey & Co', 'Management Consultant', 4620000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Saxena', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #27'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000028', 'gauri.singh28@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
  'Gauri', 'Singh', 'Female', '1993-04-01', 164, 'India',
  'Kolkata', '+91 9810227367', 'Lady Shri Ram (LSR)', 'B.Tech / B.A.',
  'Goldman Sachs', 'Investment Associate', 1290000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Singh', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #28'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000029', 'harini.varma29@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80',
  'Harini', 'Varma', 'Female', '1994-05-02', 167, 'India',
  'Ahmedabad', '+91 9810235788', 'COEP Pune', 'B.Tech / B.A.',
  'Amazon', 'Corporate Counsel', 1560000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Varma', 'Vegetarian', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #29'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000030', 'isha.bose30@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  'Isha', 'Bose', 'Female', '1995-06-03', 170, 'India',
  'Chandigarh', '+91 9810244209', 'NLSIU Bangalore', 'B.Tech / B.A.',
  'Swiggy', 'Data Scientist', 1830000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Bose', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #30'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000031', 'juhi.bhatia31@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&auto=format&fit=crop&q=80',
  'Juhi', 'Bhatia', 'Female', '1996-07-04', 155, 'India',
  'Mumbai', '+91 9810252630', 'IIT Bombay', 'B.Tech / B.A.',
  'Bain & Company', 'VP Engineering', 2100000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Bhatia', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #31'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000032', 'kriti.garg32@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
  'Kriti', 'Garg', 'Female', '1997-08-05', 158, 'India',
  'Bengaluru', '+91 9810261051', 'IIT Delhi', 'B.Tech / B.A.',
  'Morgan Stanley', 'Brand Strategist', 2370000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Garg', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #32'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000033', 'lavanya.jain33@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&auto=format&fit=crop&q=80',
  'Lavanya', 'Jain', 'Female', '1998-09-06', 161, 'India',
  'Delhi NCR', '+91 9810269472', 'BITS Pilani', 'B.Tech / B.A.',
  'Khaitan & Co', 'Senior Software Engineer', 2640000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Jain', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #33'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000034', 'mahima.kulkarni34@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
  'Mahima', 'Kulkarni', 'Female', '1999-10-07', 164, 'India',
  'Pune', '+91 9810277893', 'SRCC, Delhi University', 'B.Tech / B.A.',
  'Tata Sons', 'Product Manager', 2910000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Kulkarni', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #34'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000035', 'nidhi.mishra35@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80',
  'Nidhi', 'Mishra', 'Female', '2000-11-08', 167, 'India',
  'Hyderabad', '+91 9810286314', 'St. Xavier’s College', 'B.Tech / B.A.',
  'Freshworks', 'Management Consultant', 3180000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Mishra', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #35'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000036', 'oindrila.patel36@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'Oindrila', 'Patel', 'Female', '2001-12-09', 170, 'India',
  'Gurgaon', '+91 9810294735', 'IIM Ahmedabad', 'B.Tech / B.A.',
  'Zomato', 'Investment Associate', 3450000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Patel', 'Jain', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #36'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000037', 'pallavi.saxena37@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'Pallavi', 'Saxena', 'Female', '1993-01-10', 155, 'India',
  'Chennai', '+91 9810303156', 'ISB Hyderabad', 'B.Tech / B.A.',
  'Google', 'Corporate Counsel', 3720000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Saxena', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #37'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000038', 'ritu.singh38@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  'Ritu', 'Singh', 'Female', '1994-02-11', 158, 'India',
  'Kolkata', '+91 9810311577', 'Lady Shri Ram (LSR)', 'B.Tech / B.A.',
  'Microsoft', 'Data Scientist', 3990000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Singh', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #38'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000039', 'sakshi.varma39@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
  'Sakshi', 'Varma', 'Female', '1995-03-12', 161, 'India',
  'Ahmedabad', '+91 9810319998', 'COEP Pune', 'B.Tech / B.A.',
  'McKinsey & Co', 'VP Engineering', 4260000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Varma', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #39'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000040', 'tanya.bose40@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
  'Tanya', 'Bose', 'Female', '1996-04-13', 164, 'India',
  'Chandigarh', '+91 9810328419', 'NLSIU Bangalore', 'B.Tech / B.A.',
  'Goldman Sachs', 'Brand Strategist', 4530000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Bose', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #40'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000041', 'urvi.bhatia41@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80',
  'Urvi', 'Bhatia', 'Female', '1997-05-14', 167, 'India',
  'Mumbai', '+91 9810336840', 'IIT Bombay', 'B.Tech / B.A.',
  'Amazon', 'Senior Software Engineer', 1200000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Bhatia', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #41'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000042', 'vaishnavi.garg42@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  'Vaishnavi', 'Garg', 'Female', '1998-06-15', 170, 'India',
  'Bengaluru', '+91 9810345261', 'IIT Delhi', 'B.Tech / B.A.',
  'Swiggy', 'Product Manager', 1470000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Garg', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #42'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000043', 'yamini.jain43@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&auto=format&fit=crop&q=80',
  'Yamini', 'Jain', 'Female', '1999-07-16', 155, 'India',
  'Delhi NCR', '+91 9810353682', 'BITS Pilani', 'B.Tech / B.A.',
  'Bain & Company', 'Management Consultant', 1740000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Jain', 'Eggetarian', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #43'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000044', 'zoya.kulkarni44@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
  'Zoya', 'Kulkarni', 'Female', '2000-08-17', 158, 'India',
  'Pune', '+91 9810362103', 'SRCC, Delhi University', 'B.Tech / B.A.',
  'Morgan Stanley', 'Investment Associate', 2010000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Kulkarni', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #44'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000045', 'akanksha.mishra45@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=400&auto=format&fit=crop&q=80',
  'Akanksha', 'Mishra', 'Female', '2001-09-18', 161, 'India',
  'Hyderabad', '+91 9810370524', 'St. Xavier’s College', 'B.Tech / B.A.',
  'Khaitan & Co', 'Corporate Counsel', 2280000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Mishra', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #45'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000046', 'bhumika.patel46@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
  'Bhumika', 'Patel', 'Female', '1993-10-19', 164, 'India',
  'Gurgaon', '+91 9810378945', 'IIM Ahmedabad', 'B.Tech / B.A.',
  'Tata Sons', 'Data Scientist', 2550000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Patel', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #46'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000047', 'chitrangada.saxena47@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80',
  'Chitrangada', 'Saxena', 'Female', '1994-11-20', 167, 'India',
  'Chennai', '+91 9810387366', 'ISB Hyderabad', 'B.Tech / B.A.',
  'Freshworks', 'VP Engineering', 2820000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Saxena', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #47'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000048', 'devika.singh48@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'Devika', 'Singh', 'Female', '1995-12-21', 170, 'India',
  'Kolkata', '+91 9810395787', 'Lady Shri Ram (LSR)', 'B.Tech / B.A.',
  'Zomato', 'Brand Strategist', 3090000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Singh', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #48'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000049', 'garima.varma49@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'Garima', 'Varma', 'Female', '1996-01-22', 155, 'India',
  'Ahmedabad', '+91 9810404208', 'COEP Pune', 'B.Tech / B.A.',
  'Google', 'Senior Software Engineer', 3360000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Varma', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #49'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000050', 'himani.bose50@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  'Himani', 'Bose', 'Female', '1997-02-23', 158, 'India',
  'Chandigarh', '+91 9810412629', 'NLSIU Bangalore', 'B.Tech / B.A.',
  'Microsoft', 'Product Manager', 3630000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Bose', 'Non-Vegetarian', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #50'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000051', 'jasmine.bhatia51@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
  'Jasmine', 'Bhatia', 'Female', '1998-03-24', 161, 'India',
  'Mumbai', '+91 9810421050', 'IIT Bombay', 'B.Tech / B.A.',
  'McKinsey & Co', 'Management Consultant', 3900000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Bhatia', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #51'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000052', 'karishma.garg52@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
  'Karishma', 'Garg', 'Female', '1999-04-25', 164, 'India',
  'Bengaluru', '+91 9810429471', 'IIT Delhi', 'B.Tech / B.A.',
  'Goldman Sachs', 'Investment Associate', 4170000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Garg', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #52'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000053', 'mallika.jain53@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80',
  'Mallika', 'Jain', 'Female', '2000-05-26', 167, 'India',
  'Delhi NCR', '+91 9810437892', 'BITS Pilani', 'B.Tech / B.A.',
  'Amazon', 'Corporate Counsel', 4440000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Jain', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #53'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000054', 'nupur.kulkarni54@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
  'Nupur', 'Kulkarni', 'Female', '2001-06-27', 170, 'India',
  'Pune', '+91 9810446313', 'SRCC, Delhi University', 'B.Tech / B.A.',
  'Swiggy', 'Data Scientist', 4710000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Kulkarni', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #54'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000055', 'prerna.mishra55@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&auto=format&fit=crop&q=80',
  'Prerna', 'Mishra', 'Female', '1993-07-01', 155, 'India',
  'Hyderabad', '+91 9810454734', 'St. Xavier’s College', 'B.Tech / B.A.',
  'Bain & Company', 'VP Engineering', 1380000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Mishra', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #55'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '20000000-0000-0000-0000-000000000056', 'radha.patel56@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
  'Radha', 'Patel', 'Female', '1994-08-02', 158, 'India',
  'Gurgaon', '+91 9810463155', 'IIM Ahmedabad', 'B.Tech / B.A.',
  'Morgan Stanley', 'Brand Strategist', 1650000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Patel', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #56'
) ON CONFLICT (email) DO NOTHING;

-- 4. 56 Verified Male Pool Profiles (Opposite gender pool)
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000001', 'aarav.gupta1@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'Aarav', 'Gupta', 'Male', '1991-01-01', 172, 'India',
  'Pune', '+91 9710000000', 'BITS Pilani', 'B.Tech / B.Sc',
  'Goldman Sachs', 'Product Manager', 1800000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Gupta', 'Non-Vegetarian', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #1'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000002', 'aditya.jain2@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'Aditya', 'Jain', 'Male', '1992-02-02', 175, 'India',
  'Hyderabad', '+91 9710009411', 'SRCC, Delhi University', 'B.Tech / B.Sc',
  'Amazon', 'Management Consultant', 2140000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Jain', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #2'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000003', 'akash.khanna3@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
  'Akash', 'Khanna', 'Male', '1993-03-03', 178, 'India',
  'Gurgaon', '+91 9710018822', 'St. Xavier’s College', 'B.Tech / B.Sc',
  'Swiggy', 'Investment Associate', 2480000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Khanna', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #3'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000004', 'aman.malhotra4@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
  'Aman', 'Malhotra', 'Male', '1994-04-04', 181, 'India',
  'Chennai', '+91 9710028233', 'IIM Ahmedabad', 'B.Tech / B.Sc',
  'Bain & Company', 'Corporate Counsel', 2820000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Malhotra', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #4'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000005', 'aniruddh.mishra5@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
  'Aniruddh', 'Mishra', 'Male', '1995-05-05', 184, 'India',
  'Kolkata', '+91 9710037644', 'ISB Hyderabad', 'B.Tech / B.Sc',
  'Morgan Stanley', 'Data Scientist', 3160000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Mishra', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #5'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000006', 'arnav.nair6@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80',
  'Arnav', 'Nair', 'Male', '1996-06-06', 187, 'India',
  'Ahmedabad', '+91 9710047055', 'Lady Shri Ram (LSR)', 'B.Tech / B.Sc',
  'Khaitan & Co', 'VP Engineering', 3500000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Nair', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #6'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000007', 'aryan.rao7@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
  'Aryan', 'Rao', 'Male', '1997-07-07', 172, 'India',
  'Chandigarh', '+91 9710056466', 'COEP Pune', 'B.Tech / B.Sc',
  'Tata Sons', 'Brand Strategist', 3840000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Rao', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #7'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000008', 'ayush.saxena8@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&auto=format&fit=crop&q=80',
  'Ayush', 'Saxena', 'Male', '1998-08-08', 175, 'India',
  'Mumbai', '+91 9710065877', 'NLSIU Bangalore', 'B.Tech / B.Sc',
  'Freshworks', 'Senior Software Engineer', 4180000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Saxena', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #8'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000009', 'chaitanya.sharma9@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
  'Chaitanya', 'Sharma', 'Male', '1999-09-09', 178, 'India',
  'Bengaluru', '+91 9710075288', 'IIT Bombay', 'B.Tech / B.Sc',
  'Zomato', 'Product Manager', 4520000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Sharma', 'Non-Vegetarian', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #9'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000010', 'devansh.sinha10@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
  'Devansh', 'Sinha', 'Male', '1991-10-10', 181, 'India',
  'Delhi NCR', '+91 9710084699', 'IIT Delhi', 'B.Tech / B.Sc',
  'Google', 'Management Consultant', 4860000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Sinha', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #10'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000011', 'dhruv.varma11@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'Dhruv', 'Varma', 'Male', '1992-11-11', 184, 'India',
  'Pune', '+91 9710094110', 'BITS Pilani', 'B.Tech / B.Sc',
  'Microsoft', 'Investment Associate', 5200000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Varma', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #11'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000012', 'gaurav.yadav12@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'Gaurav', 'Yadav', 'Male', '1993-12-12', 187, 'India',
  'Hyderabad', '+91 9710103521', 'SRCC, Delhi University', 'B.Tech / B.Sc',
  'McKinsey & Co', 'Corporate Counsel', 5540000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Yadav', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #12'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000013', 'harsh.chatterjee13@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
  'Harsh', 'Chatterjee', 'Male', '1994-01-13', 172, 'India',
  'Gurgaon', '+91 9710112932', 'St. Xavier’s College', 'B.Tech / B.Sc',
  'Goldman Sachs', 'Data Scientist', 5880000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Chatterjee', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #13'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000014', 'ishaan.bhatia14@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
  'Ishaan', 'Bhatia', 'Male', '1995-02-14', 175, 'India',
  'Chennai', '+91 9710122343', 'IIM Ahmedabad', 'B.Tech / B.Sc',
  'Amazon', 'VP Engineering', 6220000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Bhatia', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #14'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000015', 'karan.desai15@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
  'Karan', 'Desai', 'Male', '1996-03-15', 178, 'India',
  'Kolkata', '+91 9710131754', 'ISB Hyderabad', 'B.Tech / B.Sc',
  'Swiggy', 'Brand Strategist', 2060000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Desai', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #15'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000016', 'kunal.gupta16@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80',
  'Kunal', 'Gupta', 'Male', '1997-04-16', 181, 'India',
  'Ahmedabad', '+91 9710141165', 'Lady Shri Ram (LSR)', 'B.Tech / B.Sc',
  'Bain & Company', 'Senior Software Engineer', 2400000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Gupta', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #16'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000017', 'manish.jain17@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
  'Manish', 'Jain', 'Male', '1998-05-17', 184, 'India',
  'Chandigarh', '+91 9710150576', 'COEP Pune', 'B.Tech / B.Sc',
  'Morgan Stanley', 'Product Manager', 2740000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Jain', 'Non-Vegetarian', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #17'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000018', 'nakul.khanna18@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&auto=format&fit=crop&q=80',
  'Nakul', 'Khanna', 'Male', '1999-06-18', 187, 'India',
  'Mumbai', '+91 9710159987', 'NLSIU Bangalore', 'B.Tech / B.Sc',
  'Khaitan & Co', 'Management Consultant', 3080000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Khanna', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #18'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000019', 'naveen.malhotra19@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
  'Naveen', 'Malhotra', 'Male', '1991-07-19', 172, 'India',
  'Bengaluru', '+91 9710169398', 'IIT Bombay', 'B.Tech / B.Sc',
  'Tata Sons', 'Investment Associate', 3420000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Malhotra', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #19'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000020', 'nikhil.mishra20@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
  'Nikhil', 'Mishra', 'Male', '1992-08-20', 175, 'India',
  'Delhi NCR', '+91 9710178809', 'IIT Delhi', 'B.Tech / B.Sc',
  'Freshworks', 'Corporate Counsel', 3760000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Mishra', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #20'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000021', 'pranav.nair21@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'Pranav', 'Nair', 'Male', '1993-09-21', 178, 'India',
  'Pune', '+91 9710188220', 'BITS Pilani', 'B.Tech / B.Sc',
  'Zomato', 'Data Scientist', 4100000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Nair', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #21'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000022', 'prateek.rao22@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'Prateek', 'Rao', 'Male', '1994-10-22', 181, 'India',
  'Hyderabad', '+91 9710197631', 'SRCC, Delhi University', 'B.Tech / B.Sc',
  'Google', 'VP Engineering', 4440000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Rao', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #22'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000023', 'raghav.saxena23@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
  'Raghav', 'Saxena', 'Male', '1995-11-23', 184, 'India',
  'Gurgaon', '+91 9710207042', 'St. Xavier’s College', 'B.Tech / B.Sc',
  'Microsoft', 'Brand Strategist', 4780000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Saxena', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #23'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000024', 'rahul.sharma24@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
  'Rahul', 'Sharma', 'Male', '1996-12-24', 187, 'India',
  'Chennai', '+91 9710216453', 'IIM Ahmedabad', 'B.Tech / B.Sc',
  'McKinsey & Co', 'Senior Software Engineer', 5120000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Sharma', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #24'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000025', 'rishi.sinha25@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
  'Rishi', 'Sinha', 'Male', '1997-01-25', 172, 'India',
  'Kolkata', '+91 9710225864', 'ISB Hyderabad', 'B.Tech / B.Sc',
  'Goldman Sachs', 'Product Manager', 5460000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Sinha', 'Non-Vegetarian', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #25'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000026', 'rohit.varma26@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80',
  'Rohit', 'Varma', 'Male', '1998-02-26', 175, 'India',
  'Ahmedabad', '+91 9710235275', 'Lady Shri Ram (LSR)', 'B.Tech / B.Sc',
  'Amazon', 'Management Consultant', 5800000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Varma', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #26'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000027', 'sahil.yadav27@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
  'Sahil', 'Yadav', 'Male', '1999-03-27', 178, 'India',
  'Chandigarh', '+91 9710244686', 'COEP Pune', 'B.Tech / B.Sc',
  'Swiggy', 'Investment Associate', 6140000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Yadav', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #27'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000028', 'sameer.chatterjee28@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&auto=format&fit=crop&q=80',
  'Sameer', 'Chatterjee', 'Male', '1991-04-01', 181, 'India',
  'Mumbai', '+91 9710254097', 'NLSIU Bangalore', 'B.Tech / B.Sc',
  'Bain & Company', 'Corporate Counsel', 1980000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Chatterjee', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #28'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000029', 'samarth.bhatia29@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
  'Samarth', 'Bhatia', 'Male', '1992-05-02', 184, 'India',
  'Bengaluru', '+91 9710263508', 'IIT Bombay', 'B.Tech / B.Sc',
  'Morgan Stanley', 'Data Scientist', 2320000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Bhatia', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #29'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000030', 'siddharth.desai30@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
  'Siddharth', 'Desai', 'Male', '1993-06-03', 187, 'India',
  'Delhi NCR', '+91 9710272919', 'IIT Delhi', 'B.Tech / B.Sc',
  'Khaitan & Co', 'VP Engineering', 2660000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Desai', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #30'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000031', 'tarun.gupta31@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'Tarun', 'Gupta', 'Male', '1994-07-04', 172, 'India',
  'Pune', '+91 9710282330', 'BITS Pilani', 'B.Tech / B.Sc',
  'Tata Sons', 'Brand Strategist', 3000000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Gupta', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #31'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000032', 'utkarsh.jain32@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'Utkarsh', 'Jain', 'Male', '1995-08-05', 175, 'India',
  'Hyderabad', '+91 9710291741', 'SRCC, Delhi University', 'B.Tech / B.Sc',
  'Freshworks', 'Senior Software Engineer', 3340000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Jain', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #32'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000033', 'varun.khanna33@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
  'Varun', 'Khanna', 'Male', '1996-09-06', 178, 'India',
  'Gurgaon', '+91 9710301152', 'St. Xavier’s College', 'B.Tech / B.Sc',
  'Zomato', 'Product Manager', 3680000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Khanna', 'Non-Vegetarian', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #33'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000034', 'vedant.malhotra34@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
  'Vedant', 'Malhotra', 'Male', '1997-10-07', 181, 'India',
  'Chennai', '+91 9710310563', 'IIM Ahmedabad', 'B.Tech / B.Sc',
  'Google', 'Management Consultant', 4020000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Malhotra', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #34'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000035', 'vikrant.mishra35@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
  'Vikrant', 'Mishra', 'Male', '1998-11-08', 184, 'India',
  'Kolkata', '+91 9710319974', 'ISB Hyderabad', 'B.Tech / B.Sc',
  'Microsoft', 'Investment Associate', 4360000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Mishra', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #35'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000036', 'yash.nair36@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80',
  'Yash', 'Nair', 'Male', '1999-12-09', 187, 'India',
  'Ahmedabad', '+91 9710329385', 'Lady Shri Ram (LSR)', 'B.Tech / B.Sc',
  'McKinsey & Co', 'Corporate Counsel', 4700000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Nair', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #36'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000037', 'zeeshan.rao37@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
  'Zeeshan', 'Rao', 'Male', '1991-01-10', 172, 'India',
  'Chandigarh', '+91 9710338796', 'COEP Pune', 'B.Tech / B.Sc',
  'Goldman Sachs', 'Data Scientist', 5040000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Rao', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #37'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000038', 'abhimanyu.saxena38@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&auto=format&fit=crop&q=80',
  'Abhimanyu', 'Saxena', 'Male', '1992-02-11', 175, 'India',
  'Mumbai', '+91 9710348207', 'NLSIU Bangalore', 'B.Tech / B.Sc',
  'Amazon', 'VP Engineering', 5380000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Saxena', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #38'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000039', 'bhuvan.sharma39@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
  'Bhuvan', 'Sharma', 'Male', '1993-03-12', 178, 'India',
  'Bengaluru', '+91 9710357618', 'IIT Bombay', 'B.Tech / B.Sc',
  'Swiggy', 'Brand Strategist', 5720000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Sharma', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #39'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000040', 'chirag.sinha40@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
  'Chirag', 'Sinha', 'Male', '1994-04-13', 181, 'India',
  'Delhi NCR', '+91 9710367029', 'IIT Delhi', 'B.Tech / B.Sc',
  'Bain & Company', 'Senior Software Engineer', 6060000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Sinha', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #40'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000041', 'deepak.varma41@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'Deepak', 'Varma', 'Male', '1995-05-14', 184, 'India',
  'Pune', '+91 9710376440', 'BITS Pilani', 'B.Tech / B.Sc',
  'Morgan Stanley', 'Product Manager', 1900000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Varma', 'Non-Vegetarian', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #41'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000042', 'eashan.yadav42@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'Eashan', 'Yadav', 'Male', '1996-06-15', 187, 'India',
  'Hyderabad', '+91 9710385851', 'SRCC, Delhi University', 'B.Tech / B.Sc',
  'Khaitan & Co', 'Management Consultant', 2240000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Yadav', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #42'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000043', 'farhan.chatterjee43@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
  'Farhan', 'Chatterjee', 'Male', '1997-07-16', 172, 'India',
  'Gurgaon', '+91 9710395262', 'St. Xavier’s College', 'B.Tech / B.Sc',
  'Tata Sons', 'Investment Associate', 2580000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Chatterjee', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #43'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000044', 'girish.bhatia44@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
  'Girish', 'Bhatia', 'Male', '1998-08-17', 175, 'India',
  'Chennai', '+91 9710404673', 'IIM Ahmedabad', 'B.Tech / B.Sc',
  'Freshworks', 'Corporate Counsel', 2920000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Bhatia', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #44'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000045', 'hemanth.desai45@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
  'Hemanth', 'Desai', 'Male', '1999-09-18', 178, 'India',
  'Kolkata', '+91 9710414084', 'ISB Hyderabad', 'B.Tech / B.Sc',
  'Zomato', 'Data Scientist', 3260000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Desai', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #45'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000046', 'jayant.gupta46@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80',
  'Jayant', 'Gupta', 'Male', '1991-10-19', 181, 'India',
  'Ahmedabad', '+91 9710423495', 'Lady Shri Ram (LSR)', 'B.Tech / B.Sc',
  'Google', 'VP Engineering', 3600000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Gupta', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #46'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000047', 'kartik.jain47@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
  'Kartik', 'Jain', 'Male', '1992-11-20', 184, 'India',
  'Chandigarh', '+91 9710432906', 'COEP Pune', 'B.Tech / B.Sc',
  'Microsoft', 'Brand Strategist', 3940000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Jain', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #47'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000048', 'lokesh.khanna48@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&auto=format&fit=crop&q=80',
  'Lokesh', 'Khanna', 'Male', '1993-12-21', 187, 'India',
  'Mumbai', '+91 9710442317', 'NLSIU Bangalore', 'B.Tech / B.Sc',
  'McKinsey & Co', 'Senior Software Engineer', 4280000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Khanna', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #48'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000049', 'mohit.malhotra49@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
  'Mohit', 'Malhotra', 'Male', '1994-01-22', 172, 'India',
  'Bengaluru', '+91 9710451728', 'IIT Bombay', 'B.Tech / B.Sc',
  'Goldman Sachs', 'Product Manager', 4620000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Malhotra', 'Non-Vegetarian', 'Yes', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #49'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000050', 'neeraj.mishra50@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
  'Neeraj', 'Mishra', 'Male', '1995-02-23', 175, 'India',
  'Delhi NCR', '+91 9710461139', 'IIT Delhi', 'B.Tech / B.Sc',
  'Amazon', 'Management Consultant', 4960000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Mishra', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #50'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000051', 'omkar.nair51@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'Omkar', 'Nair', 'Male', '1996-03-24', 178, 'India',
  'Pune', '+91 9710470550', 'BITS Pilani', 'B.Tech / B.Sc',
  'Swiggy', 'Investment Associate', 5300000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Jain', 'Nair', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #51'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000052', 'parth.rao52@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'Parth', 'Rao', 'Male', '1997-04-25', 181, 'India',
  'Hyderabad', '+91 9710479961', 'SRCC, Delhi University', 'B.Tech / B.Sc',
  'Bain & Company', 'Corporate Counsel', 5640000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Sikh', 'Rao', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #52'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000053', 'rajesh.saxena53@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
  'Rajesh', 'Saxena', 'Male', '1998-05-26', 184, 'India',
  'Gurgaon', '+91 9710489372', 'St. Xavier’s College', 'B.Tech / B.Sc',
  'Morgan Stanley', 'Data Scientist', 5980000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Christian', 'Saxena', 'Non-Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #53'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000054', 'sanket.sharma54@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
  'Sanket', 'Sharma', 'Male', '1999-06-27', 187, 'India',
  'Chennai', '+91 9710498783', 'IIM Ahmedabad', 'B.Tech / B.Sc',
  'Khaitan & Co', 'VP Engineering', 1820000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Sharma', 'Eggetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #54'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000055', 'tushar.sinha55@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
  'Tushar', 'Sinha', 'Male', '1991-07-01', 172, 'India',
  'Kolkata', '+91 9710508194', 'ISB Hyderabad', 'B.Tech / B.Sc',
  'Tata Sons', 'Brand Strategist', 2160000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Sinha', 'Jain', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #55'
) ON CONFLICT (email) DO NOTHING;
INSERT INTO public.users (
  id, email, password, role, status_tag, avatar_url, first_name, last_name, 
  gender, dob, height_cm, country, city, phone, ug_college, ug_degree, 
  company, designation, income, marital_status, languages, siblings, 
  religion, caste, diet, manglik, drinking, smoking, want_kids, 
  open_to_relocate, open_to_pets, notes
) VALUES (
  '30000000-0000-0000-0000-000000000056', 'umesh.varma56@pool.tdc.com', 'password123', 'client', 'Active', 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80',
  'Umesh', 'Varma', 'Male', '1992-08-02', 175, 'India',
  'Ahmedabad', '+91 9710517605', 'Lady Shri Ram (LSR)', 'B.Tech / B.Sc',
  'Freshworks', 'Senior Software Engineer', 2500000, 'Never Married', ARRAY['English', 'Hindi'], '1 Sibling',
  'Hindu', 'Varma', 'Vegetarian', 'No', 'Socially', 'Never', 'Yes', 'Yes', 'Yes',
  'TDC Verified Candidate Pool Profile #56'
) ON CONFLICT (email) DO NOTHING;

-- 5. Seed Realtime Chat Messages
INSERT INTO public.messages (id, created_at, sender_id, receiver_id, message, is_read)
VALUES
(gen_random_uuid(), NOW() - INTERVAL '2 days', '00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Hi Vikram! Welcome to TDC. I have curated two exceptional matches matching your criteria in Mumbai.', true),
(gen_random_uuid(), NOW() - INTERVAL '1 day', '10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Thanks Pooja! Looking forward to reviewing them. Please make sure they are open to staying in South Bombay.', true),
(gen_random_uuid(), NOW() - INTERVAL '12 hours', '00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Absolutely, noted. I have applied that filter directly in your profile.', true),
(gen_random_uuid(), NOW() - INTERVAL '6 hours', '10000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 'Hi Ananya, Pooja from TDC introduced our profiles. I loved reading about your work at Google and passion for travel!', true),
(gen_random_uuid(), NOW() - INTERVAL '2 hours', '10000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Hi Vikram! Wonderful to connect with you. Morgan Stanley quant tech sounds super fascinating! Are you visiting Bangalore anytime soon?', false)
ON CONFLICT DO NOTHING;
