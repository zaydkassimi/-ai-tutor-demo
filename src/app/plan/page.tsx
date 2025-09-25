"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PlanPage() {
  const [plan, setPlan] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("studyPlan");
      if (raw) setPlan(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="text-sm underline">← Back</Link>
        <h1 className="text-2xl font-semibold mt-2">Personalized Study Plan</h1>
        <ul className="mt-4 list-disc pl-6 space-y-2">
          {plan.length ? plan.map((p, i) => <li key={i}>{p}</li>) : <li>No plan yet. Take the placement quiz.</li>}
        </ul>
      </div>
    </main>
  );
}


