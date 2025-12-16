import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { eventType, guests, eventDate } = data;

        if (!eventType || !guests || !eventDate) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const docRef = await db.collection("private-events").add({
            ...data,
            createdAt: new Date().toISOString(),
        });

        return NextResponse.json(
            { message: "Inquiry received", id: docRef.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error sending inquiry:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
