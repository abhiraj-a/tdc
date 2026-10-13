export type UserRole = 'client' | 'matchmaker' | 'admin';

export type StatusTag = 
  | 'Active' 
  | 'Onboarding' 
  | 'Matches Sent' 
  | 'Meeting Scheduled' 
  | 'On Hold' 
  | 'Archived';

export type Gender = 'Male' | 'Female' | 'Other';

export type MaritalStatus = 'Never Married' | 'Divorced' | 'Awaiting Divorce' | 'Widowed';

export type DietType = 'Vegetarian' | 'Non-Vegetarian' | 'Eggetarian' | 'Jain' | 'Vegan';

export type ManglikType = 'Yes' | 'No' | 'Partial' | "Don't Know";

export type HabitType = 'Never' | 'Socially' | 'Regularly' | 'Occasionally';

export type PreferenceChoice = 'Yes' | 'No' | 'Maybe';

export interface User {
  id: string;
  created_at?: string;
  email: string;
  password?: string;
  role: UserRole;
  status_tag: StatusTag;
  avatar_url?: string;
  
  // Basic Biodata
  first_name: string;
  last_name: string;
  gender: Gender;
  dob: string; // YYYY-MM-DD
  height_cm: number;
  country: string;
  city: string;
  phone?: string;
  
  // Education & Career
  ug_college?: string;
  ug_degree?: string;
  company?: string;
  designation?: string;
  income: number; // Annual INR
  
  // Marital & Family
  marital_status: MaritalStatus;
  languages: string[];
  siblings?: string;
  
  // Cultural & Indian Matchmaking Specifics
  religion?: string;
  caste?: string;
  diet: DietType;
  manglik: ManglikType;
  drinking: HabitType;
  smoking: HabitType;
  
  // Lifestyle & Preferences
  want_kids: PreferenceChoice;
  open_to_relocate: PreferenceChoice;
  open_to_pets: PreferenceChoice;
  
  // Matchmaker Internal Notes
  notes?: string;
  
  // Extra biodata context
  about_me?: string;
  hobbies?: string[];
}

export interface Message {
  id: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  is_read?: boolean;
}

export interface MatchAssignment {
  id: string;
  created_at: string;
  client_id: string;
  suggested_match_id: string;
  matchmaker_id?: string;
  status: 'Suggested' | 'Sent' | 'Accepted' | 'Rejected';
  ai_score?: number;
  ai_reasoning?: string;
  pitch_note?: string;
  // Joined relation for display
  suggested_match?: User;
  client?: User;
}

export interface ScoredCandidate {
  candidate: User;
  score: number;
  ratingTier: 'High Potential Match' | 'Strong Fit' | 'Moderate Fit' | 'Exploratory Match';
  criteriaBreakdown: {
    label: string;
    passed: boolean;
    weight: number;
    details: string;
  }[];
  summaryReasons: string[];
  frictionPoints: string[];
  aiReasoning?: string;
  aiPitchNote?: string;
  aiGenerated?: boolean;
}
