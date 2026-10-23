import { AiChatbot } from "@/features/ai-chatbot/components/ai-chatbot";
import { AiChatbotHeader } from "@/features/ai-chatbot/components/ai-chatbot-header";



export default function AiChatbotPage() {
  return (
    <>
      <AiChatbotHeader />
      <AiChatbot />
    </>
  );
}
