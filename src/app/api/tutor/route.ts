import { NextRequest } from "next/server";

const CORPUS: Record<string, string[]> = {
  math: [
    "To solve linear equations, isolate the variable by inverse operations.",
    "Fractions: bring to common denominators before adding.",
    "Quadratics can be factored or solved with the quadratic formula.",
  ],
  physics: [
    "Kinematics basics: v = u + at, s = ut + 0.5at^2.",
    "Acceleration units are m/s^2. Force is measured in Newtons.",
  ],
  english: [
    "Main idea is the central point the author conveys.",
    "Look for repeated words, topic sentences, and summaries.",
  ],
};

export async function POST(req: NextRequest) {
  const { question, subject } = await req.json();
  const normalized = String(question || "").toLowerCase();

  // Simple hint-first pedagogy + tiny local retrieval
  let hint = "Let's think it through. What is being asked?";
  if (subject === "math") {
    if (normalized.includes("equation") || normalized.includes("solve")) {
      hint = "Hint: isolate the variable step by step. What operation undoes addition?";
    } else if (normalized.includes("fraction")) {
      hint = "Hint: bring to common denominators before adding or subtracting.";
    } else {
      hint = "Hint: try to restate the problem in your own words.";
    }
  } else if (subject === "physics") {
    hint = "Hint: identify knowns and unknowns; consider kinematics equations like v = u + at.";
  } else if (subject === "english") {
    hint = "Hint: find the main idea by looking for repeated words or concepts.";
  }

  const snippets = CORPUS[String(subject) as keyof typeof CORPUS] || [];
  const support = snippets.find((s) => s.toLowerCase().split(/[^a-z]+/).some((w) => normalized.includes(w))) || snippets[0] || "";
  const final = support ? `${hint} (${support})` : hint;

  // For demo, we return a data URL as a fake TTS output
  const audioUrl = ""; // integrate TTS later
  return Response.json({ hint: final, audioUrl });
}


