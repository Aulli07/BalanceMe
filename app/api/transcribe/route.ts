const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY as string;

export async function POST(request: Request) {
  const audio = await request.arrayBuffer();

  const res = await fetch("https://api.deepgram.com/v1/listen?model=nova-3&smart_format=true", {
    method: "POST",
    headers: {
      "Authorization": `Token ${DEEPGRAM_API_KEY}`,
      "Content-Type": request.headers.get("Content-Type") || "application/octet-stream"
    },
    body: audio
  });

  const data = await res.json();
  const text = data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

  return Response.json({ text });
} 