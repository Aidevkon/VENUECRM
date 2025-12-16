import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, email, date, guests } = data;

        if (!name || !email || !date || !guests) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const docRef = await db.collection("reservations").add({
            ...data,
            createdAt: new Date().toISOString(),
        });

        return NextResponse.json(
            { message: "Reservation created", id: docRef.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating reservation:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
