"use client";

import Link from "next/link";
import { useState } from "react";

type PQ = { id: string; prompt: string; choices: string[]; correct: number; subject: string };

const PLACEMENT: PQ[] = [
  { id: "m1", subject: "math", prompt: "Solve: 3x + 6 = 12", choices: ["x=1", "x=2", "x=3"], correct: 1 },
  { id: "p1", subject: "physics", prompt: "What is the unit of acceleration?", choices: ["m/s", "m/s²", "N"], correct: 1 },
  { id: "e1", subject: "english", prompt: "Find the main idea: 'The fox jumped over the fence to escape'", choices: ["fox likes fences", "fox escaped", "fence is tall"], correct: 1 },
];

export default function PlacementPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const submit = () => {
    const bySubject: Record<string, { total: number; correct: number }> = {};
    for (const q of PLACEMENT) {
      bySubject[q.subject] ||= { total: 0, correct: 0 };
      bySubject[q.subject].total += 1;
      if (answers[q.id] === q.correct) bySubject[q.subject].correct += 1;
    }
    const plan: string[] = [];
    if ((bySubject.math?.correct || 0) < (bySubject.math?.total || 0)) plan.push("Review Algebra I basics and linear equations.");
    else plan.push("Advance to Algebra II: quadratics next.");
    if ((bySubject.physics?.correct || 0) < (bySubject.physics?.total || 0)) plan.push("Revisit kinematics and units (m/s²).");
    else plan.push("Proceed to dynamics: Newton's laws.");
    if ((bySubject.english?.correct || 0) < (bySubject.english?.total || 0)) plan.push("Practice reading comprehension: identify main ideas.");
    else plan.push("Move to inference and tone analysis.");
    localStorage.setItem("studyPlan", JSON.stringify(plan));
    setDone(true);
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="text-sm underline">← Back</Link>
        <h1 className="text-2xl font-semibold mt-2">Placement Quiz</h1>
        {!done ? (
          <div className="mt-6 space-y-6">
            {PLACEMENT.map((q) => (
              <div key={q.id} className="border rounded p-4">
                <div className="font-medium">{q.prompt}</div>
                <div className="mt-3 grid sm:grid-cols-2 gap-2">
                  {q.choices.map((c, i) => (
                    <label key={i} className={`border rounded px-3 py-2 cursor-pointer ${answers[q.id] === i ? "bg-blue-50 border-blue-400" : ""}`}>
                      <input type="radio" name={q.id} className="mr-2" checked={answers[q.id] === i} onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))} />
                      {c}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={submit} className="bg-blue-600 text-white rounded px-4 py-2">Generate Study Plan</button>
          </div>
        ) : (
          <div className="mt-6">
            <div className="text-lg">Your personalized study plan is ready.</div>
            <Link href="/plan" className="underline mt-3 inline-block">View Study Plan →</Link>
          </div>
        )}
      </div>
    </main>
  );
}


