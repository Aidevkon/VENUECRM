"use client";

import { useChatbot } from "@/hooks/use-chatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Utensils, Calendar, Music, Mail, Star } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/context/navigation-context";

export function Chatbot() {
    const { messages, isLoading, sendMessage } = useChatbot();
    const { openModal } = useNavigation();
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);

    // Smart Intent Detection (Simple Keyword Matching)
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.role === "user") {
            const text = lastMessage.content.toLowerCase();
            if (text.includes("table") || text.includes("book") || text.includes("reservation")) {
                setTimeout(() => openModal("reservations"), 1000);
            } else if (text.includes("menu") || text.includes("food") || text.includes("eat")) {
                setTimeout(() => openModal("menu"), 1000);
            } else if (text.includes("event") || text.includes("party") || text.includes("private")) {
                setTimeout(() => openModal("events"), 1000);
            } else if (text.includes("review") || text.includes("testimonial") || text.includes("feedback") || text.includes("say about")) {
                setTimeout(() => openModal("reviews"), 1000);
            }
        }
    }, [messages, openModal]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input);
        setInput("");
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[600px] max-h-[90vh]">
            {/* Header */}
            <div className="p-4 bg-orange-600/90 text-white flex items-center justify-between backdrop-blur-md">
                <div>
                    <h3 className="font-bold flex items-center gap-2">
                        Wizz Assistant <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    </h3>
                    <p className="text-xs text-orange-100">Ask me anything or use the tags below</p>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-black/40" ref={scrollRef}>
                <div className="space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center text-zinc-300 mt-10 space-y-2">
                            <p className="text-lg">👋 Welcome to Wizz Lagonisi!</p>
                            <p className="text-sm opacity-70">I can help you book a table, plan an event, or show you our menu.</p>
                        </div>
                    )}
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex w-full",
                                msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-md",
                                    msg.role === "user"
                                        ? "bg-orange-600 text-white rounded-br-none"
                                        : "bg-white/90 text-zinc-900 rounded-bl-none"
                                )}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white/90 rounded-2xl rounded-bl-none px-4 py-2 text-sm text-zinc-500 shadow-md">
                                Typing...
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-black/80 backdrop-blur-md border-t border-white/10">
                <div className="flex gap-3 items-center">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-orange-500 h-12"
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-orange-600 hover:bg-orange-700 text-white h-12 w-12 shrink-0">
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </form>

            {/* Tag Labels (Quick Actions) - Moved to Bottom */}
            <div className="p-2 pb-4 bg-black/80 backdrop-blur-md flex gap-2 justify-center overflow-x-auto no-scrollbar border-t border-white/5">
                <Button variant="outline" size="sm" className="rounded-full text-xs bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white h-8 px-3" onClick={() => openModal("menu")}>
                    <Utensils className="w-3 h-3 mr-1.5" /> Menu
                </Button>
                <Button variant="outline" size="sm" className="rounded-full text-xs bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white h-8 px-3" onClick={() => openModal("reservations")}>
                    <Calendar className="w-3 h-3 mr-1.5" /> Book
                </Button>
                <Button variant="outline" size="sm" className="rounded-full text-xs bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white h-8 px-3" onClick={() => openModal("events")}>
                    <Music className="w-3 h-3 mr-1.5" /> Events
                </Button>
                <Button variant="outline" size="sm" className="rounded-full text-xs bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white h-8 px-3" onClick={() => openModal("reviews")}>
                    <Star className="w-3 h-3 mr-1.5" /> Reviews
                </Button>
                <Button variant="outline" size="sm" className="rounded-full text-xs bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white h-8 px-3" onClick={() => openModal("contact")}>
                    <Mail className="w-3 h-3 mr-1.5" /> Contact
                </Button>
            </div>
        </div>
    );
}
