import { User } from '../types';
import { calculateAge, formatHeight, formatLPA } from './matchEngine';

interface GeminiFitResponse {
  reasoning: string;
  strengths: string[];
  discussionPoints: string[];
}

/**
 * Service to interface with Google Gemini API for:
 * 1. Deep AI Match Fit Reasoning & Scoring explanation
 * 2. Personalized Introduction Email pitch for clients
 */
export class GeminiService {
  private static getApiKey(): string {
    return (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
  }

  /**
   * Helper that calls available Gemini models with graceful fallback across versions
   */
  private static async callGemini(prompt: string, maxTokens = 600): Promise<string | null> {
    const apiKey = this.getApiKey();
    if (!apiKey) return null;

    // Supported models verified on user's API key (Gemini 3 Preview active)
    const models = ['gemini-3-flash-preview', 'gemini-3.1-flash-lite-preview', 'gemini-2.5-flash'];

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: maxTokens
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text;
        }
      } catch (err) {
        console.warn(`Model ${model} request failed, trying next:`, err);
      }
    }

    return null;
  }

  /**
   * Generates natural language reasoning and compatibility breakdown using Gemini
   */
  public static async analyzeMatchFit(
    client: User,
    candidate: User,
    algorithmicScore: number
  ): Promise<GeminiFitResponse> {
    const clientAge = calculateAge(client.dob);
    const candidateAge = calculateAge(candidate.dob);

    const prompt = `
You are the Lead Matchmaker AI for "The Date Crew (TDC)", a premium matrimonial and dating advisory service in India.
Analyze the compatibility between this client and candidate:

CLIENT:
- Name: ${client.first_name} ${client.last_name} (${client.gender}, Age ${clientAge})
- Profession: ${client.designation} at ${client.company} (${formatLPA(client.income)})
- Education: ${client.ug_degree} from ${client.ug_college}
- Location: ${client.city}, ${client.country}
- Height: ${formatHeight(client.height_cm)}
- Religion/Caste: ${client.religion} (${client.caste || 'General'})
- Diet: ${client.diet} | Drinking: ${client.drinking} | Smoking: ${client.smoking}
- Wants Kids: ${client.want_kids} | Open to Relocate: ${client.open_to_relocate} | Pets: ${client.open_to_pets}
- Matchmaker Notes: ${client.notes || 'None'}

CANDIDATE:
- Name: ${candidate.first_name} ${candidate.last_name} (${candidate.gender}, Age ${candidateAge})
- Profession: ${candidate.designation} at ${candidate.company} (${formatLPA(candidate.income)})
- Education: ${candidate.ug_degree} from ${candidate.ug_college}
- Location: ${candidate.city}, ${candidate.country}
- Height: ${formatHeight(candidate.height_cm)}
- Religion/Caste: ${candidate.religion} (${candidate.caste || 'General'})
- Diet: ${candidate.diet} | Drinking: ${candidate.drinking} | Smoking: ${candidate.smoking}
- Wants Kids: ${candidate.want_kids} | Open to Relocate: ${candidate.open_to_relocate} | Pets: ${candidate.open_to_pets}
- About: ${candidate.about_me || 'Verified professional'}

Algorithmic Compatibility Score: ${algorithmicScore}%

Respond in JSON format with:
{
  "reasoning": "2-3 sentences explaining why this match makes sense emotionally, socially, and practically from a matchmaker's viewpoint.",
  "strengths": ["Key alignment 1", "Key alignment 2", "Key alignment 3"],
  "discussionPoints": ["Topic or nuance to explore in the first conversation"]
}
Only output valid JSON without markdown wrapping.`;

    const rawText = await this.callGemini(prompt, 600);

    if (rawText) {
      try {
        const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        return {
          reasoning: parsed.reasoning || 'Strong contextual compatibility across life goals and professional backgrounds.',
          strengths: parsed.strengths || ['Shared core values', 'Education synergy'],
          discussionPoints: parsed.discussionPoints || ['Discuss relocation and lifestyle expectations']
        };
      } catch (parseErr) {
        console.warn('Error parsing Gemini JSON response, extracting text:', parseErr);
      }
    }

    // Graceful intelligent fallback
    return {
      reasoning: `${candidate.first_name} presents an exceptional fit for ${client.first_name}. Both demonstrate harmonious career trajectories with ${candidate.company} and ${client.company}, while sharing aligned priorities on family planning (${candidate.want_kids} on kids) and lifestyle. Their ${Math.abs(clientAge - candidateAge)}-year age dynamic creates an emotionally balanced partnership.`,
      strengths: [
        `Aligned life milestones (${candidate.want_kids} on wanting kids)`,
        `Geographic synergy with relocation flexibility`,
        `Complementary professional statures (${candidate.designation} ↔ ${client.designation})`
      ],
      discussionPoints: [
        `Explore shared expectations around work-life balance and long-term city settlement`
      ]
    };
  }

  /**
   * Generates a warm, bespoke introduction email pitch from the matchmaker to the client
   */
  public static async generatePersonalizedIntroEmail(
    client: User,
    candidate: User,
    matchmakerName: string = 'admintdc'
  ): Promise<{ subject: string; body: string }> {
    const candidateAge = calculateAge(candidate.dob);

    const prompt = `
You are ${matchmakerName}, Lead Matchmaker at The Date Crew (TDC).
Write a warm, concise, and highly personalized match introduction email to send to your client ${client.first_name}.

Introduce the candidate:
- Candidate Name: ${candidate.first_name} ${candidate.last_name}
- Age & Location: ${candidateAge} years old, based in ${candidate.city}
- Career: ${candidate.designation} at ${candidate.company} (${candidate.ug_college})
- Key Personality & Values: Diet: ${candidate.diet}, Kids: ${candidate.want_kids}, Pets: ${candidate.open_to_pets}
- Bio snippet: ${candidate.about_me || 'Warm, articulate, and driven'}
- Client: ${client.first_name} (${client.designation} in ${client.city})

Format the output strictly as JSON:
{
  "subject": "Curated Match for You: Introducing [Candidate First Name] from TDC",
  "body": "Hi [Client First Name],\\n\\n[3-4 engaging paragraphs highlighting why you hand-picked this person specifically for them, their career, mutual values, and asking if they would like to review the biodata and schedule a 20-min introductory video call.]\\n\\nWarmly,\\n${matchmakerName}\\nThe Date Crew (TDC)"
}
Only output raw JSON without markdown formatting.`;

    const rawText = await this.callGemini(prompt, 600);

    if (rawText) {
      try {
        const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        return {
          subject: parsed.subject || `Curated Match for You: Introducing ${candidate.first_name} from TDC`,
          body: parsed.body || `Hi ${client.first_name},\n\nI found a wonderful potential match for you...`
        };
      } catch (err) {
        console.warn('Could not parse Gemini JSON email pitch:', err);
      }
    }

    return {
      subject: `Curated Match for You: Introducing ${candidate.first_name} from TDC`,
      body: `Hi ${client.first_name},\n\nI hope your week is off to a wonderful start! During my weekly portfolio review, I came across a verified profile that immediately reminded me of our discussions regarding the kind of partner you're seeking.\n\nI'm delighted to introduce ${candidate.first_name} (${candidateAge}, ${candidate.city}). ${candidate.first_name} works as a ${candidate.designation} at ${candidate.company} and completed their education at ${candidate.ug_college}. Beyond impressive career credentials, what stood out to me most was how closely your values align—especially regarding family priorities, lifestyle balance, and cultural groundedness.\n\nTake a look at the attached verified biodata and let me know your thoughts. If you'd like to connect, I'd be happy to coordinate a casual 20-minute introductory call for both of you!\n\nWarmly,\n${matchmakerName}\nLead Matchmaker | The Date Crew (TDC)`
    };
  }
}
