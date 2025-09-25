"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const consentGiven = typeof window !== "undefined" && localStorage.getItem("parentConsent") === "true";
    const userName = typeof window !== "undefined" ? localStorage.getItem("userName") : null;
    if (!consentGiven) {
      router.replace("/consent");
      return;
    }
    if (!userName) {
      router.replace("/dashboard");
      return;
    }
    router.replace("/dashboard");
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">AI Tutoring Platform Demo</h1>
        <p className="text-gray-500 mt-2">Redirecting…</p>
      </div>
    </main>
  );
}
