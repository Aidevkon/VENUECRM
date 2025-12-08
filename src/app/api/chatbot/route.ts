import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { message, conversationHistory } = await req.json();

        if (!process.env.GOOGLE_API_KEY) {
            return NextResponse.json(
                { error: "Google API Key is missing" },
                { status: 500 }
            );
        }

        // Read the knowledge base file
        const filePath = path.join(process.cwd(), "src", "data", "restaurant-info.md");
        let knowledgeBase = "";
        try {
            knowledgeBase = fs.readFileSync(filePath, "utf-8");
        } catch (error) {
            console.error("Error reading knowledge base:", error);
            return NextResponse.json(
                { error: "Failed to load knowledge base" },
                { status: 500 }
            );
        }

        // Construct the prompt with context
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const systemPrompt = `
You are the AI assistant for Wizz Lagonisi, a restaurant in Lagonisi, Greece.
Your goal is to help customers with their inquiries about the menu, events, policies, and location.
Always be polite, helpful, and professional.
Use the following information to answer the user's question. If the answer is not in the provided text, politely say you don't know and suggest they contact the restaurant directly.

---
${knowledgeBase}
---

Current conversation:
${conversationHistory.map((msg: any) => `${msg.role}: ${msg.content}`).join("\n")}
User: ${message}
Assistant:
`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });
    } catch (error: any) {
        console.error("Error generating response:", error);

        // Check for Rate Limit (429) or Overloaded (503)
        if (error.status === 429 || error.status === 503 || error.message?.includes("429")) {
            return NextResponse.json({
                reply: "I'm receiving too many messages right now! 🤯 Please wait 30 seconds and try again."
            });
        }

        return NextResponse.json(
            { error: error?.message || "Failed to generate response" },
            { status: 500 }
        );
    }
}
