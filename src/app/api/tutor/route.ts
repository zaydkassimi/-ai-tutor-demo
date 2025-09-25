import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { question, subject } = await req.json();
  const normalized = String(question || "").toLowerCase();

  // Simple hint-first pedagogy
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

  // For demo, we return a data URL as a fake TTS output
  const audioUrl = ""; // could be filled by integrating TTS later
  return Response.json({ hint, audioUrl });
}


