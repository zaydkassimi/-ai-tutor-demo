AI Tutoring Platform – Demo

What’s included
- Consent flow: `/consent` collects guardian and student name, stores local consent
- Student dashboard: `/dashboard` with lessons, quiz entry, points
- Lesson with AI tutor: `/lesson/[subject]/[slug]` chat + simulated STT, placeholder avatar
- Tutor API: `/api/tutor` returns hint-first responses
- STT API: `/api/stt` simulates Whisper transcription
- Quiz with auto-grading and gamification: `/quiz/demo`
- Parent dashboard: `/parent` shows points, badges, and time on platform

Run locally
1. Install deps: `npm install`
2. Start dev server: `npm run dev`
3. Open `http://localhost:3000`

Demo flow
1. Landing redirects to `/consent`. Enter guardian + student, accept, continue.
2. On `/dashboard`, pick a lesson, e.g. Math → Algebra I.
3. Ask the tutor a question; you’ll get a hint-first reply. Try mic: Start → Stop.
4. Take the demo quiz in `/quiz/demo`, submit, see instant feedback and points/badge.
5. Visit `/parent` to see progress and notifications.

Notes
- All data is localStorage only for demo. No external services required.
- Replace avatar with HeyGen/DID or wire real STT/TTS later.
