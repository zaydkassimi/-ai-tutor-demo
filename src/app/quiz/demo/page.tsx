"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Q = { id: string; question: string; choices: string[]; correctIndex: number };

const QUESTIONS: Q[] = [
  { id: "q1", question: "What is 2 + 3?", choices: ["4", "5", "6", "7"], correctIndex: 1 },
  { id: "q2", question: "Solve for x: x + 4 = 9", choices: ["3", "4", "5", "6"], correctIndex: 2 },
];

export default function DemoQuizPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [badge, setBadge] = useState<string | null>(null);

  useEffect(() => {
    if (!submitted) return;
    const s = QUESTIONS.reduce((acc, q) => (answers[q.id] === q.correctIndex ? acc + 1 : acc), 0);
    setScore(s);
    const pointsEarned = s * 10;
    const prev = Number(localStorage.getItem("points") || 0);
    const total = prev + pointsEarned;
    localStorage.setItem("points", String(total));
    if (s === QUESTIONS.length) {
      setBadge("Algebra Starter");
      localStorage.setItem("badge:algebra-starter", "true");
    }
  }, [submitted, answers]);

  const feedback = useMemo(() => {
    if (!submitted) return null;
    if (score === QUESTIONS.length) return "Excellent! You mastered this set.";
    if (score === 0) return "Let's review basics. The tutor will recommend a remedial lesson.";
    return "Nice effort! Review missed questions with the tutor.";
  }, [submitted, score]);

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="text-sm underline">← Back to dashboard</Link>
        <h1 className="text-2xl font-semibold mt-2">Demo Quiz</h1>
        {!submitted ? (
          <div className="mt-6 space-y-6">
            {QUESTIONS.map((q) => (
              <div key={q.id} className="border rounded p-4">
                <div className="font-medium">{q.question}</div>
                <div className="mt-3 grid sm:grid-cols-2 gap-2">
                  {q.choices.map((c, idx) => (
                    <label key={idx} className={`border rounded px-3 py-2 cursor-pointer ${answers[q.id] === idx ? "bg-blue-50 border-blue-400" : ""}`}>
                      <input
                        type="radio"
                        name={q.id}
                        className="mr-2"
                        checked={answers[q.id] === idx}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: idx }))}
                      />
                      {c}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setSubmitted(true)} className="bg-green-600 text-white rounded px-4 py-2">Submit</button>
          </div>
        ) : (
          <div className="mt-6">
            <div className="text-lg">Score: {score} / {QUESTIONS.length}</div>
            {feedback && <div className="mt-2 text-gray-700">{feedback}</div>}
            {badge && (
              <div className="mt-3 inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">🏅 Badge earned: {badge}</div>
            )}
            <div className="mt-6 flex gap-3">
              <Link href="/lesson/math/algebra-1" className="underline">Review with AI Tutor</Link>
              <Link href="/dashboard" className="underline">Back to Dashboard</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


