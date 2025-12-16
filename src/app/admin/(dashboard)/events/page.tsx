import { db } from "@/lib/firebase";
import { format } from "date-fns";

async function getEvents() {
    if (!db) return [];
    try {
        const snapshot = await db.collection("private-events")
            .orderBy("createdAt", "desc")
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Failed to fetch events:", error);
        return [];
    }
}

export default async function EventsPage() {
    const events = await getEvents();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Private Events</h1>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Date & Guests</th>
                                <th className="px-6 py-4">Budget</th>
                                <th className="px-6 py-4">Requirements</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {events.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                                        No event inquiries found.
                                    </td>
                                </tr>
                            ) : (
                                events.map((evt: any) => (
                                    <tr key={evt.id} className="hover:bg-zinc-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white capitalize">{evt.eventType}</div>
                                            <div className="text-zinc-500 text-xs text-nowrap">Submitted {evt.createdAt ? format(new Date(evt.createdAt), "P") : ""}</div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-300">
                                            <div>Date: {evt.eventDate}</div>
                                            <div className="text-zinc-500 text-xs">Est. Guests: {evt.guests}</div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-300">
                                            {evt.budget ? `€${evt.budget}` : "-"}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400 italic max-w-xs truncate" title={evt.requirements}>
                                            {evt.requirements || "-"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
