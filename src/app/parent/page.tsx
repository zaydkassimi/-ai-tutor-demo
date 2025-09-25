"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ParentDashboardPage() {
  const [studentName, setStudentName] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  useEffect(() => {
    setStudentName(localStorage.getItem("userName"));
    setPoints(Number(localStorage.getItem("points") || 0));
    const earned: string[] = [];
    if (localStorage.getItem("badge:algebra-starter") === "true") earned.push("Algebra Starter");
    setBadges(earned);
    const t0 = Number(localStorage.getItem("timeStart") || Date.now());
    localStorage.setItem("timeStart", String(t0));
    const id = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - t0) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="text-sm underline">← Back to student view</Link>
        <h1 className="text-2xl font-semibold mt-2">Parent Dashboard</h1>
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          <Stat label="Student" value={studentName || "—"} />
          <Stat label="Points" value={String(points)} />
          <Stat label="Time on platform" value={`${Math.floor(timeSpent/60)}m ${timeSpent%60}s`} />
        </div>
        <section className="mt-6">
          <h2 className="font-semibold">Badges</h2>
          <div className="mt-2 flex gap-2 flex-wrap">
            {badges.length ? badges.map((b) => (
              <span key={b} className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">🏅 {b}</span>
            )) : <span className="text-gray-600">No badges yet</span>}
          </div>
        </section>
        <section className="mt-6">
          <h2 className="font-semibold">Notifications</h2>
          <ul className="mt-2 list-disc pl-6 text-gray-700">
            {points >= 20 ? (
              <li>Your child mastered Algebra I demo set.</li>
            ) : (
              <li>Needs support in basic arithmetic. Consider reviewing with the AI tutor.</li>
            )}
          </ul>
        </section>
        <section className="mt-6">
          <h2 className="font-semibold">Set a study goal</h2>
          <div className="mt-2 text-sm text-gray-700">For demo, goals are not persisted remotely.</div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded p-4">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}


