import { useState, useRef } from "react";


export function useSpeechInputForm() {
  const [transcript, setTranscript] = useState<string>("");
  const [listening, setListening] = useState<boolean>(false);
  const [transcribing, setTranscribing] = useState(false);
  const [error, setError] = useState("");

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const start = async () => {
    setError("");
    setTranscript("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        {audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        }}
      );
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        streamRef.current?.getTracks().forEach((track) => track.stop());

        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        setTranscribing(true);  

        console.log("Blob size:", blob.size, "bytes");
        console.log("Chunks", chunksRef.current.length);

        const url = URL.createObjectURL(blob);
        new Audio(url).play();


        try {
          const res = await fetch("/api/transcribe", {
            method: "POST",
            headers: { "Content-Type": blob.type },
            body: blob,
          });
          const { text } = await res.json();
          setTranscript(text);
        } catch (error) {
          setError("Failed to transcribe audio");
        } finally {
          setTranscribing(false);
        }
      };

      recorder.start();
      recorderRef.current = recorder;
      setListening(true);
    } catch (err) {
      setError("Microphone access denied or not available");
    }
  }

  const stop = () => {
    recorderRef.current?.stop();
    setListening(false);
  };

  return {
    transcript,
    setTranscript,
    listening,
    transcribing,
    error,
    start,
    stop,
  };
}
