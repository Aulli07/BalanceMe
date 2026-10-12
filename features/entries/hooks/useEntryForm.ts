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
  onerror: (() => void) | null;
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
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const isRecognitionActive = useRef(false);

  useEffect(() => {
    const speechWindow = window as SpeechRecognitionWindow;
    const SR = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!SR) {
      console.error("SpeechRecognition is not supported in this browser.");
      return;
    }

    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      isRecognitionActive.current = true;
      setListening(true);
    };
    recognition.onend = () => {
      isRecognitionActive.current = false;
      setListening(false);
    };
    recognition.onerror = () => {
      isRecognitionActive.current = false;
      setListening(false);
    };
    recognition.onaudiostart = () => console.log("Audio started");
    recognition.onspeechstart = () => console.log("Speech detected");
    
    recognition.onresult = (event: SpeechRecognitionResultEvent) => {
      // const text = Array.from(event.results)
      //   .map((result) => result[0].transcript)
      //   .join("");
      // setTranscript(text);
      let finalText = "";
      let interimText = "";

      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript;
        } else {
          interimText += event.results[i][0].transcript;
        }
      }

      setTranscript(finalText + interimText);
    }

    recognitionRef.current = recognition;
    return () => {
      isRecognitionActive.current = false;
      recognition.abort();
    };
  }, []);

  const onStart = () => {
    if (!recognitionRef.current || isRecognitionActive.current) return;

    setTranscript("");
    isRecognitionActive.current = true;
    setListening(true);

    try {
      recognitionRef.current.start();
    } catch (error) {
      isRecognitionActive.current = false;
      setListening(false);
      console.error("Unable to start speech recognition.", error);
    }
  }

  const onStop = () => {
    if (!recognitionRef.current || !isRecognitionActive.current) return;
    recognitionRef.current.stop();
  }

  return {
    transcript,
    setTranscript,
    listening,
    onStart,
    onStop
  };
}
