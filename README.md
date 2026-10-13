# The Date Crew (TDC) - Matchmaker OS & Recommendation Engine MVP

An internal matchmaking operations platform and algorithmic recommendation system designed for The Date Crew (TDC). The system enables matchmakers to manage verified client rosters, inspect complete Indian matrimonial biodata, compute gender-specific compatibility scores across candidate pools, generate AI-assisted profile fit reasoning and introductory pitch notes, record match dispatches, and conduct real-time communication between users.

---

## Table of Contents
1. Executive Summary
2. Technology Stack & Design Decisions
3. Matching Algorithm Architecture
4. Artificial Intelligence (AI) Integration
5. System Assumptions
6. Database Schema & Data Modeling
7. Real-Time Chat Architecture
8. Getting Started & Installation
9. Demo Credentials

---

## 1. Executive Summary

Matchmakers manage clients across various phases of their relationship journey. This platform unifies pipeline management and algorithmic candidate scoring into a centralized dashboard. Matchmakers can:
- Review verified customer profiles with detailed personal, cultural, academic, and lifestyle biodata.
- Track customer journey stages (`Active`, `Onboarding`, `Matches Sent`, `Meeting Scheduled`, `On Hold`, `Archived`).
- Run a gender-specific recommendation engine that filters and ranks opposite-gender candidates from a candidate pool of over 100 profiles.
- Trigger contextual AI reasoning and automated introduction emails via Google Gemini API.
- Dispatch matches, updating pipeline statuses and recording matches in dedicated audit logs.
- Conduct real-time two-way messaging powered by database WebSockets.

---

## 2. Technology Stack & Design Decisions

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| Frontend Framework | React 18, TypeScript, Vite | Fast development compilation, type safety, modular component structure, and minimal production bundle size for cloud hosting. |
| Styling Architecture | Vanilla CSS (CSS Variables, Glassmorphism) | Custom design system tailored to Indian matrimonial aesthetics without utility-framework bloat. High-contrast typography and accessibility. |
| Database & Backend | Supabase (PostgreSQL 15) | Relational integrity, structured foreign keys, JSON support, indexing on demographic columns, and Row Level Security (RLS). |
| Real-Time Engine | Supabase Realtime Channels | WebSocket replication on PostgreSQL change feeds for sub-100ms message delivery between users without polling. |
| Generative AI | Google Gemini API (`gemini-3-flash-preview`) | Low-latency inference, large context window, and structured JSON output generation for profile reasoning and personalized outreach. |

---

## 3. Matching Algorithm Architecture

The matchmaking algorithm is implemented in `src/services/matchEngine.ts`. To accommodate differing demographic dynamics in traditional and modern Indian matrimonial practices, the scoring engine branches into two distinct gender-specific pipelines using a 100-point composite scoring matrix.

### 3.1 Pipeline for Male Clients (Seeking Female Candidates)

The male customer evaluation focuses on conventional demographic and lifestyle alignment criteria:

1. **Age Harmony (Maximum 25 Points):**
   - Candidate is 1 to 5 years younger: +25 points (optimal demographic band).
   - Candidate is 6 or more years younger: +18 points.
   - Same age cohort: +12 points.
   - Candidate is older: +4 points (triggers friction point warning for matchmaker review).

2. **Income Dynamics (Maximum 20 Points):**
   - Candidate earns less than or equal to client: +20 points (`candidate.income <= client.income`).
   - Candidate earns higher income: +6 points (triggers income parity flag).

3. **Height Harmony (Maximum 20 Points):**
   - Candidate is shorter than client: +20 points (`candidate.height_cm < client.height_cm`).
   - Candidate is equal or taller: +4 points (triggers height discrepancy flag).

4. **Children Horizon (Maximum 20 Points):**
   - Identical outlook on wanting children: +20 points (`want_kids` exact match).
   - Flexible alignment (either party specifies 'Maybe'): +12 points.
   - Opposing stances ('Yes' versus 'No'): 0 points (critical friction factor).

5. **Lifestyle, Diet & Location Alignment (Maximum 15 Points):**
   - Dietary compatibility (Vegetarian, Jain, Eggetarian, Non-Vegetarian): +5 points.
   - Geographic co-location (Same primary city): +6 points; or relocation willingness: +4 points.
   - Pet compatibility (`open_to_pets` alignment): +4 points.

### 3.2 Pipeline for Female Clients (Seeking Male Candidates)

The female customer evaluation prioritizes career trajectory, educational background, shared long-term values, and emotional maturity:

1. **Professional & Educational Synergy (Maximum 25 Points):**
   - Both parties from Tier-1 institutions (IIT, BITS, IIM, SRCC, LSR, NLSIU, Ivy League): +15 points.
   - Corporate leadership synergy (e.g., Google, Microsoft, McKinsey, Bain, Goldman Sachs, Morgan Stanley): +10 points.

2. **Geographic Viability & Relocation (Maximum 20 Points):**
   - Both parties residing in the same city: +20 points (zero geographic friction).
   - Inter-city with explicit relocation openness: +15 points.
   - Inter-city without relocation willingness: +4 points (triggers geographic barrier flag).

3. **Core Values & Family Horizon (Maximum 25 Points):**
   - Children perspective alignment (`want_kids`): +15 points (flexible: +8 points).
   - Attitude toward pets (`open_to_pets` harmony): +10 points.

4. **Maturity Dynamic & Age Gap (Maximum 15 Points):**
   - Male candidate is 0 to 5 years older: +15 points (optimal maturity dynamic).
   - Male candidate is 6 to 8 years older: +10 points.
   - Male candidate is younger: +6 points (triggers maturity disparity flag).

5. **Financial Stability & Dietary Compatibility (Maximum 15 Points):**
   - Candidate demonstrates income parity or strength (`candidate.income >= client.income`): +10 points.
   - Identical dietary lifestyle: +5 points.

### 3.3 Scoring Tiers

Every candidate is evaluated and sorted in descending order:
- **88% to 100%:** High Potential Match (Optimal alignment across core and secondary criteria).
- **76% to 87%:** Strong Fit (High compatibility with minor conversational nuances).
- **62% to 75%:** Moderate Fit (Viable match requiring matchmaker facilitation).
- **Below 62%:** Exploratory Match (Significant divergent lifestyle or demographic factors).

---

## 4. Artificial Intelligence (AI) Integration

AI capabilities are powered by Google Gemini (`gemini-3-flash-preview`) in `src/services/geminiService.ts`. The AI layer augments algorithmic scores with context-aware natural language processing.

### 4.1 Natural Language Profile Fit Reasoning
When a matchmaker initiates AI analysis on a candidate card, the system passes both parties' biodatas (career, education, income, city, dietary restrictions, family planning, and internal notes) to the model. The model produces:
- **Matchmaker Fit Summary:** Concise 2-3 sentence overview analyzing emotional, social, and practical compatibility.
- **Key Strengths:** Specific synergies to highlight during client consultations.
- **Discussion Points:** Strategic talking points and icebreakers for introductory calls.

### 4.2 Automated Introduction Pitch Generator
When dispatching a match via the "Send Match" workflow, Gemini generates a tailored outreach email addressed from the matchmaker to the client. The prompt constructs an engaging, personalized email that:
- Highlights the candidate's career credentials, university background, and city.
- Identifies mutual values (family expectations, dietary lifestyle, hobbies).
- Proposes a 20-minute introductory conversation.
- Allows the matchmaker to review and edit the draft before dispatching.

---

## 5. System Assumptions

1. **Internal Operations Tooling:** The interface is built as a matchmaker-facing console (`role = 'matchmaker'`), not a consumer-facing dating application. Matchmakers manage client profiles, view confidential notes, and coordinate match dispatches.
2. **Deterministic Gender Pairing:** Matching pools strictly enforce opposite-gender candidates (`Male` clients are paired with `Female` candidates, and vice versa) in adherence to the problem brief specifications.
3. **Indian Matrimonial Realities:** Attributes such as family planning (`want_kids`), dietary lifestyle (`diet`), relocation willingness, and Kundli/Manglik status are treated as core evaluation parameters alongside career and education.
4. **Income Parity Norms:** In accordance with the project brief's specifications for male profiles, traditional income and height expectations are factored into algorithmic weighting, while female profile logic emphasizes career pedigree, stability, and values harmony.
5. **Database Single Source of Truth:** All biodata, meeting notes, messages, and match dispatch records are persisted directly in PostgreSQL via Supabase. No hardcoded or unpersisted records are displayed in the dashboard.

---

## 6. Database Schema & Data Modeling

The schema is defined in `schema.sql` and deployed on Supabase PostgreSQL:

### 6.1 `users` Table
Stores matchmakers, active clients, and the candidate pool:
- `id` (UUID, Primary Key)
- `email` (TEXT, Unique)
- `password` (TEXT)
- `role` (TEXT: `client`, `matchmaker`, `admin`)
- `status_tag` (TEXT: `Active`, `Onboarding`, `Matches Sent`, `Meeting Scheduled`, `On Hold`, `Archived`)
- `first_name`, `last_name`, `gender`, `dob`, `height_cm`, `country`, `city`, `phone`
- `ug_college`, `ug_degree`, `company`, `designation`, `income`
- `marital_status`, `languages`, `siblings`
- `religion`, `caste`, `diet`, `manglik`, `drinking`, `smoking`
- `want_kids`, `open_to_relocate`, `open_to_pets`
- `notes` (Matchmaker call logs and intake notes)
- `avatar_url` (Profile photography URL)

### 6.2 `messages` Table
Powers real-time two-way messaging:
- `id` (UUID, Primary Key)
- `created_at` (TIMESTAMPTZ)
- `sender_id` (UUID, Foreign Key referencing `users.id`)
- `receiver_id` (UUID, Foreign Key referencing `users.id`)
- `message` (TEXT)
- `is_read` (BOOLEAN)

### 6.3 `match_assignments` Table
Maintains the audit trail of dispatched matches:
- `id` (UUID, Primary Key)
- `created_at` (TIMESTAMPTZ)
- `client_id` (UUID, Foreign Key referencing `users.id`)
- `suggested_match_id` (UUID, Foreign Key referencing `users.id`)
- `matchmaker_id` (UUID, Foreign Key referencing `users.id`)
- `status` (TEXT: `Suggested`, `Sent`, `Accepted`, `Rejected`)
- `pitch_note` (TEXT: Email draft sent to the client)

---

## 7. Real-Time Chat Architecture

The platform supports real-time two-way messaging between any two registered users in the database (`src/components/ChatMessengerView.tsx`):
- Matchmakers can communicate directly with clients or simulate conversations between paired candidates.
- A perspective switcher allows toggling sender and recipient roles instantly for demonstration and testing.
- The interface subscribes to Supabase Realtime channels via PostgreSQL change feeds (`postgres_changes` on table `messages`), appending incoming messages instantaneously without page reloads.

---

## 8. Getting Started & Installation

### Prerequisites
- Node.js (version 18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abhiraj-a/tdc.git
cd tdc
```

2. Install dependencies:
```bash
npm install
```

3. Configure Environment Variables:
Create a `.env` file in the root directory (based on `.env.example`):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_GEMINI_API_KEY=your-gemini-api-key
```

4. Database Setup & Seeding:
Execute `schema.sql` in your Supabase SQL Editor, followed by `seed_data.sql` to populate the 120+ candidate profiles and initial messaging records.

5. Start the Development Server:
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

6. Build for Production:
```bash
npm run build
```

---

## 9. Demo Credentials

| Role | Username / Email | Password |
| :--- | :--- | :--- |
| Lead Matchmaker | `admin@tdc.com` | `admin123` |


The login screen provides a one-click demo login option to populate the matchmaker credentials instantly.
