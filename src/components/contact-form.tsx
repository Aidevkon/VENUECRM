"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to send message");
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
                <h3 className="font-bold text-lg">Message Sent!</h3>
                <p>We'll get back to you shortly.</p>
                <Button onClick={() => setSuccess(false)} variant="outline" className="mt-4">
                    Send another message
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="john@example.com" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" required placeholder="Inquiry about..." />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" required placeholder="How can we help?" />
            </div>
            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
            </Button>
        </form>
    );
}
