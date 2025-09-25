"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ConsentPage() {
  const router = useRouter();
  const [guardianName, setGuardianName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [accepted, setAccepted] = useState(false);

  const submit = () => {
    if (!accepted || !guardianName || !studentName) return;
    localStorage.setItem("parentConsent", "true");
    localStorage.setItem("guardianName", guardianName);
    localStorage.setItem("userName", studentName);
    router.replace("/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-xl border border-black/10 p-6 shadow">
        <h1 className="text-2xl font-semibold">Parental Consent</h1>
        <p className="text-sm text-gray-600 mt-2">
          For demo purposes only. This simulates GDPR/parental consent. No data is stored remotely.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">Guardian name</label>
            <input value={guardianName} onChange={(e) => setGuardianName(e.target.value)} className="w-full border rounded px-3 py-2 bg-transparent" placeholder="e.g. Maria Papadopoulou" />
          </div>
          <div>
            <label className="block text-sm mb-1">Student name</label>
            <input value={studentName} onChange={(e) => setStudentName(e.target.value)} className="w-full border rounded px-3 py-2 bg-transparent" placeholder="e.g. Nikos" />
          </div>
          <div className="flex items-center gap-2">
            <input id="accept" type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
            <label htmlFor="accept" className="text-sm">I consent to this educational demo experience.</label>
          </div>
          <button onClick={submit} className="w-full bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50" disabled={!accepted || !guardianName || !studentName}>
            Continue to Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}


