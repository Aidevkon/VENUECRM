import { db } from "@/lib/firebase";
import { StatsCard } from "@/components/admin/stats-card";
import { Calendar, MessageSquare, PartyPopper, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getStats() {
    if (!db) return { reservations: 0, messages: 0, events: 0 };

    try {
        const [reservationsSnap, messagesSnap, eventsSnap] = await Promise.all([
            db.collection("reservations").count().get(),
            db.collection("messages").count().get(),
            db.collection("private-events").count().get(),
        ]);

        return {
            reservations: reservationsSnap.data().count,
            messages: messagesSnap.data().count,
            events: eventsSnap.data().count,
        };
    } catch (error) {
        console.error("Error fetching stats:", error);
        return { reservations: 0, messages: 0, events: 0 };
    }
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Link href="/">View Site</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Reservations"
                    value={stats.reservations}
                    icon={Calendar}
                    description="All time bookings"
                />
                <StatsCard
                    title="Messages"
                    value={stats.messages}
                    icon={MessageSquare}
                    description="Contact form inquiries"
                />
                <StatsCard
                    title="Private Events"
                    value={stats.events}
                    icon={PartyPopper}
                    description="Event inquiries"
                />
            </div>

            {/* Quick Actions or Recent Activity could go here */}
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center py-12">
                <p className="text-zinc-500">Select a category from the sidebar to view detailed data.</p>
            </div>
        </div>
    );
}
