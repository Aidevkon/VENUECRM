"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function PrivateEventForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/private-events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to book event");
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
                <h3 className="font-bold text-lg">Inquiry Sent!</h3>
                <p>Our events team will contact you shortly.</p>
                <div className="flex gap-2 justify-center mt-4">
                    <Button onClick={() => setSuccess(false)} variant="outline">
                        Send another inquiry
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
                    <Label htmlFor="eventType">Event Type</Label>
                    <Select name="eventType" required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="birthday">Birthday</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="guests">Estimated Guests</Label>
                    <Input id="guests" name="guests" type="number" min="10" required placeholder="50" />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="eventDate">Preferred Date</Label>
                <Input id="eventDate" name="eventDate" type="date" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="budget">Budget (Optional)</Label>
                <Input id="budget" name="budget" type="number" placeholder="€" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="requirements">Special Requirements</Label>
                <Textarea id="requirements" name="requirements" placeholder="Catering, music, theme..." />
            </div>
            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white" disabled={loading}>
                {loading ? "Sending..." : "Send Inquiry"}
            </Button>
        </form>
    );
}
