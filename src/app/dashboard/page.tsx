"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    setUserName(storedName);
    const p = Number(localStorage.getItem("points") || 0);
    setPoints(p);
    // simple daily streak logic
    const today = new Date().toDateString();
    const lastDay = localStorage.getItem("lastActiveDay");
    let s = Number(localStorage.getItem("streak") || 0);
    if (lastDay !== today) {
      if (lastDay && new Date(lastDay).getTime() === new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0,0,0,0)) {
        s += 1;
      } else {
        s = 1;
      }
      localStorage.setItem("streak", String(s));
      localStorage.setItem("lastActiveDay", today);
    }
    setStreak(Number(localStorage.getItem("streak") || s));
  }, []);

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Welcome{userName ? `, ${userName}` : ""}</h1>
            <p className="text-gray-600">Your AI-powered study space</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">Points: {points}</span>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">Streak: {streak}🔥</span>
            <Link href="/parent" className="text-sm underline">Parent Dashboard</Link>
          </div>
        </header>

        <section className="mt-8 grid sm:grid-cols-3 gap-4">
          <Card title="Math: Algebra I" href="/lesson/math/algebra-1" />
          <Card title="Physics: Kinematics" href="/lesson/physics/kinematics" />
          <Card title="English: Reading" href="/lesson/english/reading-1" />
        </section>

        <section className="mt-8">
          <h2 className="font-semibold">Try a quiz</h2>
          <div className="mt-3">
            <Link href="/quiz/demo" className="inline-block bg-green-600 text-white px-4 py-2 rounded">Start Demo Quiz</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({ title, href }: { title: string; href: string }) {
  return (
    <Link href={href} className="block border rounded-lg p-4 hover:bg-gray-50">
      <div className="font-medium">{title}</div>
      <div className="text-sm text-gray-600">Open lesson</div>
    </Link>
  );
}


