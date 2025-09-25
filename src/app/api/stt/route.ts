import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // Demo STT: just return a fixed sentence to simulate Whisper
  const { audioBase64 } = await req.json();
  if (!audioBase64) {
    return Response.json({ text: "" });
  }
  return Response.json({ text: "I am not sure about this step. Can you give me a hint?" });
}


