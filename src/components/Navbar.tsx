"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [userName, setUserName] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    const onStorage = () => {
      setPoints(Number(localStorage.getItem("points") || 0));
      setUserName(localStorage.getItem("userName"));
    };
    onStorage();
    const id = setInterval(onStorage, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="sticky top-0 z-40 bg-white/70 dark:bg-neutral-900/70 backdrop-blur border-b border-black/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="font-semibold">AI Tutor</Link>
          <Link href="/dashboard" className="text-sm text-gray-700">Dashboard</Link>
          <Link href="/quiz/demo" className="text-sm text-gray-700">Quiz</Link>
          <Link href="/parent" className="text-sm text-gray-700">Parent</Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">{userName ? `Hi, ${userName}` : "Guest"}</span>
          <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">{points} pts</span>
        </div>
      </div>
    </nav>
  );
}


