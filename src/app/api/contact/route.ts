import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, email, message } = data;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const docRef = await db.collection("messages").add({
            ...data,
            createdAt: new Date().toISOString(),
        });

        return NextResponse.json(
            { message: "Message sent", id: docRef.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
