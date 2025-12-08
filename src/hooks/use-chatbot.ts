import { useState } from "react";

export type Message = {
    role: "user" | "model";
    content: string;
};

export function useChatbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => setIsOpen((prev) => !prev);

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userMessage: Message = { role: "user", content };
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: content,
                    conversationHistory: messages,
                }),
            });

            if (!response.ok) throw new Error("Failed to send message");

            const data = await response.json();
            const botMessage: Message = { role: "model", content: data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            // Optionally handle error state here
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        isLoading,
        isOpen,
        toggleChat,
        sendMessage,
    };
}
