"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ReservationForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to book");
            setSuccess(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="text-center p-6 bg-green-50 text-green-700 rounded-lg">
                <h3 className="font-bold text-lg">Reservation Confirmed!</h3>
                <p>We look forward to seeing you.</p>
                <div className="flex gap-2 justify-center mt-4">
                    <Button onClick={() => setSuccess(false)} variant="outline">
                        Make another booking
                    </Button>
                    <Button onClick={() => window.location.reload()} variant="ghost">
                        Back to Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="guests">Guests</Label>
                    <Input id="guests" name="guests" type="number" min="1" required placeholder="2" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="+30..." />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="date">Date & Time</Label>
                <Input id="date" name="date" type="datetime-local" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea id="specialRequests" name="specialRequests" placeholder="Allergies, seating preference..." />
            </div>
            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white" disabled={loading}>
                {loading ? "Booking..." : "Confirm Booking"}
            </Button>
        </form>
    );
}
