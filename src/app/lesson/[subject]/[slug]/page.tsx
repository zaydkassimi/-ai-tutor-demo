"use client";

import Link from "next/link";
import { use, useMemo, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function LessonPage({ params }: { params: Promise<{ subject: string; slug: string }> }) {
  const resolved = use(params);
  const subject = resolved.subject;
  const slug = resolved.slug;
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: `Welcome to ${subject.toUpperCase()} – ${slug.replaceAll("-", " ")}. I will guide you with hints first.` },
  ]);
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const avatarUrl = useMemo(() => {
    return "/vercel.svg"; // placeholder avatar image; could be replaced with HeyGen video
  }, []);

  const speak = (text: string) => {
    try {
      if (typeof window === "undefined") return;
      const synth = window.speechSynthesis;
      if (!synth) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1.0;
      synth.cancel();
      synth.speak(utter);
    } catch {}
  };

  const send = async (text: string) => {
    if (!text.trim()) return;
    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    const res = await fetch("/api/tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text, subject }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.hint }]);
    if (data.hint) speak(data.hint);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    chunksRef.current = [];
    mr.ondataavailable = (e) => chunksRef.current.push(e.data);
    mr.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      const res = await fetch("/api/stt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ audioBase64: base64 }) });
      const data = await res.json();
      await send(data.text || "");
    };
    mediaRecorderRef.current = mr;
    mr.start();
    setSpeaking(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream.getTracks().forEach((t) => t.stop());
    setSpeaking(false);
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="text-sm underline">← Back to dashboard</Link>
        <h1 className="text-2xl font-semibold mt-2">Lesson: {subject} / {slug.replaceAll("-", " ")}</h1>

        <section className="mt-4 grid sm:grid-cols-[160px_1fr] gap-4 items-start">
          <div className="border rounded-lg p-3 flex flex-col items-center">
            <img src={avatarUrl} alt="Avatar" className="w-24 h-24" />
            <div className="text-xs text-gray-600 mt-2">AI Avatar (placeholder)</div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="h-[320px] overflow-y-auto space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "assistant" ? "text-blue-800" : "text-gray-900"}>
                  <span className="text-xs uppercase mr-2">{m.role}</span>
                  <span>{m.content}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask the tutor…" className="flex-1 border rounded px-3 py-2 bg-transparent" />
              <button onClick={() => send(input)} className="bg-blue-600 text-white rounded px-4 py-2">Send</button>
              {!speaking ? (
                <button onClick={startRecording} className="border rounded px-3">🎙️ Start</button>
              ) : (
                <button onClick={stopRecording} className="border rounded px-3">⏹ Stop</button>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


