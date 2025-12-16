import { db } from "@/lib/firebase";
import { format } from "date-fns";

async function getMessages() {
    if (!db) return [];
    try {
        const snapshot = await db.collection("messages")
            .orderBy("createdAt", "desc")
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return [];
    }
}

export default async function MessagesPage() {
    const messages = await getMessages();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Messages</h1>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">From</th>
                                <th className="px-6 py-4">Subject</th>
                                <th className="px-6 py-4">Message</th>
                                <th className="px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {messages.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                                        No messages found.
                                    </td>
                                </tr>
                            ) : (
                                messages.map((msg: any) => (
                                    <tr key={msg.id} className="hover:bg-zinc-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{msg.name}</div>
                                            <div className="text-zinc-500 text-xs">{msg.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-white">
                                            {msg.subject}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400 max-w-sm truncate" title={msg.message}>
                                            {msg.message}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500 text-xs whitespace-nowrap">
                                            {msg.createdAt ? format(new Date(msg.createdAt), "PPP") : "N/A"}
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
