import { User, ScoredCandidate } from '../types';

/**
 * Calculates current age from a YYYY-MM-DD birthdate string
 */
export function calculateAge(dob: string): number {
  if (!dob) return 28;
  const birthDate = new Date(dob);
  const diffMs = Date.now() - birthDate.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
}

/**
 * Formats annual Indian currency into clean Lakhs/Crores display
 */
export function formatLPA(income: number): string {
  if (!income || income <= 0) return 'Undisclosed';
  const lakhs = income / 100000;
  if (lakhs >= 100) {
    const crores = (lakhs / 100).toFixed(1);
    return `₹${crores.replace('.0', '')} Cr/year`;
  }
  return `₹${lakhs.toFixed(1).replace('.0', '')} LPA`;
}

/**
 * Formats height in cm to feet and inches representation (e.g., 175 cm -> 5'9")
 */
export function formatHeight(cm: number): string {
  if (!cm) return '';
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}" (${cm} cm)`;
}

// Prestigious higher education institutes for educational alignment
const TIER_1_COLLEGES = [
  'IIT', 'BITS', 'IIM', 'ISB', 'SRCC', 'LSR', 'St. Xavier', 'COEP', 'NLSIU', 
  'Columbia', 'Harvard', 'Stanford', 'LBS', 'NIT', 'Presidency'
];

function isTier1College(college?: string): boolean {
  if (!college) return false;
  return TIER_1_COLLEGES.some(t => college.toLowerCase().includes(t.toLowerCase()));
}

/**
 * Gender-Specific Matchmaker Scoring Algorithm
 * Implements strict rules specified in TDC problem brief:
 * 
 * For Male Customers:
 *  - Women who are younger
 *  - Earn less
 *  - Shorter
 *  - Matching views on children
 * 
 * For Female Customers:
 *  - Compatibility on profession & education
 *  - Relocation preferences
 *  - Shared values (Kids, Pets, Diet, Lifestyle)
 *  - Healthy age & maturity dynamic
 */
export function scoreMatch(client: User, candidate: User): ScoredCandidate {
  const clientAge = calculateAge(client.dob);
  const candidateAge = calculateAge(candidate.dob);
  
  const breakdown: ScoredCandidate['criteriaBreakdown'] = [];
  const reasons: string[] = [];
  const frictionPoints: string[] = [];
  let score = 0;

  if (client.gender === 'Male') {
    // -------------------------------------------------------------
    // LOGIC FOR MALE CLIENTS SEEKING FEMALE CANDIDATES
    // -------------------------------------------------------------

    // 1. Age Rule: Match with women who are younger
    if (candidateAge < clientAge) {
      const diff = clientAge - candidateAge;
      if (diff >= 1 && diff <= 5) {
        score += 25;
        breakdown.push({
          label: 'Age Dynamic (Younger)',
          passed: true,
          weight: 25,
          details: `Candidate is ${diff} year(s) younger (${candidateAge} vs ${clientAge} yrs) - optimal sweet spot.`
        });
        reasons.push(`${diff} years younger (${candidateAge} yrs)`);
      } else {
        score += 18;
        breakdown.push({
          label: 'Age Dynamic (Younger)',
          passed: true,
          weight: 18,
          details: `Candidate is ${diff} years younger (${candidateAge} vs ${clientAge} yrs).`
        });
        reasons.push(`${diff} years age gap (${candidateAge} yrs)`);
      }
    } else if (candidateAge === clientAge) {
      score += 12;
      breakdown.push({
        label: 'Age Dynamic',
        passed: true,
        weight: 12,
        details: `Same age cohort (${candidateAge} yrs).`
      });
    } else {
      score += 4;
      breakdown.push({
        label: 'Age Rule',
        passed: false,
        weight: 0,
        details: `Candidate is older (${candidateAge} vs ${clientAge} yrs).`
      });
      frictionPoints.push(`Candidate is older (${candidateAge} vs ${clientAge})`);
    }

    // 2. Income Rule: Match with women who earn less
    if (candidate.income <= client.income) {
      score += 20;
      breakdown.push({
        label: 'Income Ratio (Earns Less)',
        passed: true,
        weight: 20,
        details: `Candidate earns ${formatLPA(candidate.income)} vs client's ${formatLPA(client.income)} (meets conventional expectation).`
      });
      reasons.push(`Complementary earnings (${formatLPA(candidate.income)})`);
    } else {
      score += 6;
      breakdown.push({
        label: 'Income Ratio',
        passed: false,
        weight: 6,
        details: `Candidate earns higher (${formatLPA(candidate.income)} vs ${formatLPA(client.income)}).`
      });
      frictionPoints.push(`Candidate has higher income (${formatLPA(candidate.income)})`);
    }

    // 3. Height Rule: Match with women who are shorter
    if (candidate.height_cm < client.height_cm) {
      score += 20;
      const heightDiff = client.height_cm - candidate.height_cm;
      breakdown.push({
        label: 'Height Harmony (Shorter)',
        passed: true,
        weight: 20,
        details: `Candidate is ${heightDiff} cm shorter (${formatHeight(candidate.height_cm)} vs ${formatHeight(client.height_cm)}).`
      });
      reasons.push(`Harmonious height match (${formatHeight(candidate.height_cm)})`);
    } else {
      score += 4;
      breakdown.push({
        label: 'Height Harmony',
        passed: false,
        weight: 4,
        details: `Candidate is taller or equal height (${formatHeight(candidate.height_cm)} vs ${formatHeight(client.height_cm)}).`
      });
      frictionPoints.push(`Candidate is taller (${formatHeight(candidate.height_cm)})`);
    }

    // 4. Children Views: Matching views on children
    if (client.want_kids === candidate.want_kids) {
      score += 20;
      breakdown.push({
        label: 'Children Views',
        passed: true,
        weight: 20,
        details: `Aligned outlook on wanting children (${client.want_kids} ↔ ${candidate.want_kids}).`
      });
      reasons.push(`Mutual '${client.want_kids}' on having children`);
    } else if (client.want_kids === 'Maybe' || candidate.want_kids === 'Maybe') {
      score += 12;
      breakdown.push({
        label: 'Children Views',
        passed: true,
        weight: 12,
        details: `Flexible outlook on children (${client.want_kids} vs ${candidate.want_kids}).`
      });
    } else {
      score += 0;
      breakdown.push({
        label: 'Children Views',
        passed: false,
        weight: 0,
        details: `Opposing views on children (${client.want_kids} vs ${candidate.want_kids}).`
      });
      frictionPoints.push(`Opposite views on having kids (${client.want_kids} vs ${candidate.want_kids})`);
    }

    // 5. Cultural, Diet & Relocation Secondary Factors (15 pts total)
    // Diet
    if (client.diet === candidate.diet) {
      score += 5;
      breakdown.push({
        label: 'Dietary Compatibility',
        passed: true,
        weight: 5,
        details: `Both observe ${client.diet} dietary preferences.`
      });
      reasons.push(`Shared ${client.diet} diet`);
    } else if (
      (client.diet === 'Vegetarian' && candidate.diet === 'Jain') ||
      (client.diet === 'Non-Vegetarian' && candidate.diet !== 'Jain')
    ) {
      score += 3;
    }

    // Location / Relocation
    if (client.city === candidate.city) {
      score += 6;
      reasons.push(`Co-located in ${client.city}`);
    } else if (candidate.open_to_relocate === 'Yes') {
      score += 4;
      reasons.push(`Candidate open to relocate to ${client.city}`);
    }

    // Pets
    if (client.open_to_pets === candidate.open_to_pets && client.open_to_pets === 'Yes') {
      score += 4;
      reasons.push(`Both enthusiastic pet lovers`);
    }

  } else {
    // -------------------------------------------------------------
    // LOGIC FOR FEMALE CLIENTS SEEKING MALE CANDIDATES
    // -------------------------------------------------------------

    // 1. Professional & Educational Synergy (25 pts)
    let eduProfScore = 0;
    const clientTier1 = isTier1College(client.ug_college);
    const candTier1 = isTier1College(candidate.ug_college);

    if (clientTier1 && candTier1) {
      eduProfScore += 15;
      reasons.push(`Top-tier academic pedigree (${candidate.ug_college})`);
    } else if (candTier1 || clientTier1) {
      eduProfScore += 10;
    } else {
      eduProfScore += 8;
    }

    // Corporate / Career synergy
    if (candidate.company && (candidate.company === client.company || ['Google', 'Microsoft', 'Bain', 'McKinsey', 'Goldman Sachs', 'Morgan Stanley'].some(c => candidate.company?.includes(c)))) {
      eduProfScore += 10;
      reasons.push(`High-impact corporate leadership at ${candidate.company}`);
    } else {
      eduProfScore += 6;
    }
    score += eduProfScore;
    breakdown.push({
      label: 'Career & Educational Synergy',
      passed: true,
      weight: eduProfScore,
      details: `${candidate.designation} at ${candidate.company || 'Corporate'} with education from ${candidate.ug_college || 'Top University'}.`
    });

    // 2. Relocation & Geographic Practicality (20 pts)
    if (client.city === candidate.city) {
      score += 20;
      breakdown.push({
        label: 'Geographic Alignment',
        passed: true,
        weight: 20,
        details: `Both based in ${client.city} with zero relocation hurdles.`
      });
      reasons.push(`Both residing in ${client.city}`);
    } else if (candidate.open_to_relocate === 'Yes' || client.open_to_relocate === 'Yes') {
      score += 15;
      breakdown.push({
        label: 'Relocation Openness',
        passed: true,
        weight: 15,
        details: `Different cities (${client.city} ↔ ${candidate.city}) but flexible relocation agreement.`
      });
      reasons.push(`Candidate willing to relocate`);
    } else {
      score += 4;
      frictionPoints.push(`Located in ${candidate.city} without relocation readiness`);
    }

    // 3. Values Harmony: Children & Pets (25 pts)
    if (client.want_kids === candidate.want_kids) {
      score += 15;
      breakdown.push({
        label: 'Family & Children Vision',
        passed: true,
        weight: 15,
        details: `Harmonious family horizon regarding kids (${client.want_kids}).`
      });
      reasons.push(`Shared family planning outlook ('${client.want_kids}' on kids)`);
    } else if (client.want_kids === 'Maybe' || candidate.want_kids === 'Maybe') {
      score += 8;
    } else {
      frictionPoints.push(`Divergent views on wanting children`);
    }

    if (client.open_to_pets === candidate.open_to_pets) {
      score += 10;
      reasons.push(`Compatible attitude towards pets (${candidate.open_to_pets})`);
    }

    // 4. Age & Maturity Dynamic (15 pts)
    const ageDiff = candidateAge - clientAge;
    if (ageDiff >= 0 && ageDiff <= 5) {
      score += 15;
      breakdown.push({
        label: 'Maturity Dynamic',
        passed: true,
        weight: 15,
        details: `Male candidate is ${ageDiff} year(s) older (${candidateAge} vs ${clientAge} yrs) - balanced emotional maturity.`
      });
      reasons.push(`${ageDiff} years older (${candidateAge} yrs) with balanced maturity`);
    } else if (ageDiff > 5 && ageDiff <= 8) {
      score += 10;
    } else if (ageDiff < 0) {
      score += 6;
      frictionPoints.push(`Candidate is younger (${candidateAge} vs ${clientAge} yrs)`);
    }

    // 5. Financial Security & Dietary Compatibility (15 pts)
    if (candidate.income >= client.income) {
      score += 10;
      breakdown.push({
        label: 'Financial Security',
        passed: true,
        weight: 10,
        details: `Solid financial parity/strength (${formatLPA(candidate.income)}).`
      });
      reasons.push(`Financial strength (${formatLPA(candidate.income)})`);
    } else {
      score += 6;
    }

    if (client.diet === candidate.diet) {
      score += 5;
      reasons.push(`Identical ${client.diet} dietary habits`);
    }
  }

  // Cap score to 100 max
  score = Math.min(Math.max(Math.round(score), 42), 99);

  let ratingTier: ScoredCandidate['ratingTier'] = 'Exploratory Match';
  if (score >= 88) ratingTier = 'High Potential Match';
  else if (score >= 76) ratingTier = 'Strong Fit';
  else if (score >= 62) ratingTier = 'Moderate Fit';

  return {
    candidate,
    score,
    ratingTier,
    criteriaBreakdown: breakdown,
    summaryReasons: reasons.slice(0, 4),
    frictionPoints: frictionPoints.slice(0, 2)
  };
}

/**
 * Filters the candidate pool for the client:
 * 1. Opposite gender
 * 2. Never matches client with themselves
 * 3. Runs gender-specific algorithm
 * 4. Sorts descending by score
 */
export function getRankedMatches(client: User, allUsers: User[]): ScoredCandidate[] {
  const targetGender = client.gender === 'Male' ? 'Female' : 'Male';

  const oppositeGenderPool = allUsers.filter(u => 
    u.id !== client.id && 
    u.gender === targetGender &&
    u.role !== 'matchmaker'
  );

  const scored = oppositeGenderPool.map(candidate => scoreMatch(client, candidate));
  
  // Sort descending by score
  return scored.sort((a, b) => b.score - a.score);
}
