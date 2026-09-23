export type AnswerValue = "low" | "medium" | "high";

export type AssessmentAnswer = {
  questionId: string;
  value: AnswerValue;
};

export type CareerMatch = {
  slug: string;
  name: string;
  score: number;
  summary: string;
  reasons: string[];
};

type CareerProfile = {
  name: string;
  summary: string;
  reasons: string[];
  weights: Record<string, number>;
};

const answerScore: Record<AnswerValue, number> = {
  low: 0,
  medium: 1,
  high: 2,
};

const careerProfiles: Record<string, CareerProfile> = {
  "software-engineering": {
    name: "Software Engineering",
    summary: "You enjoy logic, digital tools, and building practical solutions.",
    reasons: [
      "Strong analytical thinking",
      "Comfort with technology and systems",
      "Prefers problem-solving over routine tasks",
    ],
    weights: {
      q1: 2,
      q2: 2,
      q4: 1,
      q5: 2,
      q6: 1,
      q8: 2,
      q10: 1,
      q12: 2,
      q14: 1,
      q16: 2,
      q18: 1,
      q20: 1,
    },
  },
  "electrical-engineering": {
    name: "Electrical Engineering",
    summary: "You like technical systems, practical building work, and using math to solve problems.",
    reasons: [
      "Likes technical and hands-on work",
      "Works well with applied math and physics",
      "Enjoys building and improving systems",
    ],
    weights: {
      q1: 2,
      q2: 2,
      q3: 2,
      q5: 1,
      q7: 1,
      q8: 2,
      q9: 1,
      q11: 2,
      q13: 1,
      q15: 2,
      q17: 1,
      q19: 1,
    },
  },
  architecture: {
    name: "Architecture",
    summary: "You notice spaces, design details, and how things should look and function.",
    reasons: [
      "Creative visual thinking",
      "Pays attention to design and function",
      "Likes planning and improving surroundings",
    ],
    weights: {
      q2: 1,
      q4: 2,
      q6: 1,
      q7: 2,
      q9: 1,
      q10: 1,
      q12: 1,
      q14: 2,
      q15: 1,
      q16: 2,
      q17: 1,
      q20: 2,
    },
  },
  marketing: {
    name: "Marketing & Brand Strategy",
    summary: "You enjoy communication, influencing ideas, and connecting with people.",
    reasons: [
      "Strong communication instincts",
      "Enjoys presenting and persuading",
      "Likes understanding what people respond to",
    ],
    weights: {
      q4: 1,
      q6: 2,
      q7: 1,
      q8: 1,
      q10: 2,
      q12: 1,
      q13: 1,
      q14: 2,
      q16: 1,
      q17: 2,
      q18: 2,
      q20: 1,
    },
  },
  healthcare: {
    name: "Healthcare & Patient Support",
    summary: "You value helping people, teamwork, and practical service in daily life.",
    reasons: [
      "Empathy and service orientation",
      "Enjoys helping people in meaningful ways",
      "Comfort with structured, people-centered work",
    ],
    weights: {
      q3: 1,
      q4: 1,
      q6: 2,
      q9: 2,
      q10: 2,
      q11: 1,
      q13: 2,
      q17: 1,
      q18: 1,
      q19: 2,
      q20: 1,
    },
  },
  teaching: {
    name: "Education & Teaching",
    summary: "You enjoy helping others grow, explaining ideas, and creating supportive learning environments.",
    reasons: [
      "Good at explaining concepts clearly",
      "Enjoys helping others learn",
      "Cares about mentoring and guidance",
    ],
    weights: {
      q3: 1,
      q4: 2,
      q6: 1,
      q7: 1,
      q9: 2,
      q10: 2,
      q12: 1,
      q13: 1,
      q17: 2,
      q18: 2,
      q19: 1,
      q20: 1,
    },
  },
  agriculture: {
    name: "Agriculture & Food Systems",
    summary: "You are interested in practical work, nature, and creating value from the land.",
    reasons: [
      "Comfort with hands-on outdoor work",
      "Enthusiasm for sustainability and production",
      "Likes solving real-world practical problems",
    ],
    weights: {
      q2: 1,
      q3: 2,
      q5: 1,
      q7: 1,
      q9: 1,
      q11: 2,
      q13: 1,
      q15: 1,
      q17: 2,
      q18: 1,
      q19: 2,
      q20: 1,
    },
  },
  "product-design": {
    name: "Product & UX Design",
    summary: "You like combining creativity, usability, and solving real problems for people.",
    reasons: [
      "Strong creative instincts",
      "Enjoys improving user experiences",
      "Balances aesthetics with practical thinking",
    ],
    weights: {
      q1: 1,
      q4: 2,
      q6: 1,
      q7: 2,
      q8: 1,
      q10: 1,
      q12: 2,
      q14: 2,
      q15: 1,
      q16: 1,
      q18: 1,
      q20: 2,
    },
  },
};

export function recommendMatches(answers: AssessmentAnswer[]): CareerMatch[] {
  if (!answers.length) {
    return Object.entries(careerProfiles)
      .slice(0, 5)
      .map(([slug, profile]) => ({
        slug,
        name: profile.name,
        score: 72,
        summary: profile.summary,
        reasons: profile.reasons,
      }));
  }

  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.value]));

  return Object.entries(careerProfiles)
    .map(([slug, profile]) => {
      let scoredTotal = 0;
      let maxPossible = 0;

      Object.entries(profile.weights).forEach(([questionId, weight]) => {
        maxPossible += weight * 2;
        const chosen = answerMap.get(questionId) ?? "low";
        scoredTotal += answerScore[chosen] * weight;
      });

      const score = Math.min(
        99,
        Math.max(35, Math.round((scoredTotal / Math.max(maxPossible, 1)) * 100)),
      );

      return {
        slug,
        name: profile.name,
        score,
        summary: profile.summary,
        reasons: profile.reasons,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
