"use client";


import { customerType } from "@/app/add-entry/page";
import { useEffect, useRef, useState } from "react";
import type { entryDetailType } from "../components/add-entry-two";


type SpeechRecognitionResultEvent = {
  results: ArrayLike<{
    isFinal: boolean;
    [index: number]: {
      transcript: string;
    };
  }>;
};

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onaudiostart: (() => void) | null;
  onspeechstart: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

export function useEntryForm() {
  const [amount, setAmount] = useState<[string, string]>(["0", "0"]);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customer, setCustomer] = useState<customerType | undefined>(undefined);
  const [entryType, setEntryType] = useState<0 | 1>(0);
  const [entryDescription, setEntryDescription] = useState<entryDetailType>({ category: "", description: "", });
  
  const [categoryPickerOpen, setCategoryPickerOpen] = useState(false);
  const [selectedTrigger, isSelectedTrigger] = useState(false);

  const updateDescription = (field: keyof entryDetailType, value: string | File | undefined) => {
    setEntryDescription((current) => ({
      ...current,
      [field]: value,
    }))
  }

  return {
    amount,
    setAmount,
    step,
    setStep,
    customer,
    setCustomer,
    entryType,
    setEntryType,
    entryDescription,
    setEntryDescription,
    updateDescription,
    setCategoryPickerOpen, 
    categoryPickerOpen,
    selectedTrigger,
    isSelectedTrigger

  };  
};










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
