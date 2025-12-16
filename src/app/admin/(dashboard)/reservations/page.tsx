import { db } from "@/lib/firebase";
import { format } from "date-fns";

async function getReservations() {
    if (!db) return [];
    try {
        const snapshot = await db.collection("reservations")
            .orderBy("createdAt", "desc") // Assuming we want creation order, or we can use 'date' if stored as ISO
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Failed to fetch reservations:", error);
        return [];
    }
}

export default async function ReservationsPage() {
    const reservations = await getReservations();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Reservations</h1>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Guests</th>
                                <th className="px-6 py-4">Request</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {reservations.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                                        No reservations found.
                                    </td>
                                </tr>
                            ) : (
                                reservations.map((res: any) => (
                                    <tr key={res.id} className="hover:bg-zinc-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{res.name}</div>
                                            <div className="text-zinc-500 text-xs">{res.email}</div>
                                            <div className="text-zinc-500 text-xs">{res.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-300">
                                            {res.date ? format(new Date(res.date), "PPP p") : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-300">
                                            {res.guests}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400 italic">
                                            {res.specialRequests || "-"}
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
