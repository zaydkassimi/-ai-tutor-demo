"use client";

import { useEffect, useState } from "react";

export default function GdprBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("gdprSeen") === "true";
    setVisible(!seen);
  }, []);

  if (!visible) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-50">
      <div className="max-w-3xl mx-auto m-4 p-4 rounded-lg border bg-white/90 dark:bg-neutral-900/90 backdrop-blur">
        <div className="text-sm text-gray-700">
          This demo stores data only in your browser (localStorage). By continuing you acknowledge this preview and GDPR awareness.
        </div>
        <div className="mt-2 text-right">
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
            onClick={() => {
              localStorage.setItem("gdprSeen", "true");
              setVisible(false);
            }}
          >
            I understand
          </button>
        </div>
      </div>
    </div>
  );
}


