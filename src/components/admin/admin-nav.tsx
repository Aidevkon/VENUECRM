"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, LayoutDashboard, LogOut, PartyPopper } from "lucide-react";

export function AdminNav() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        // In a real app, call an API to clear the cookie server-side too
        document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        router.push("/admin/login");
        router.refresh();
    };

    const navItems = [
        { href: "/admin", label: "Overview", icon: LayoutDashboard },
        { href: "/admin/reservations", label: "Reservations", icon: Calendar },
        { href: "/admin/messages", label: "Messages", icon: MessageSquare },
        { href: "/admin/events", label: "Private Events", icon: PartyPopper },
    ];

    return (
        <div className="flex flex-col w-64 border-r border-zinc-800 bg-zinc-900/50 h-screen sticky top-0">
            <div className="p-6">
                <h2 className="text-xl font-bold text-white tracking-tight">
                    WIZZ <span className="text-orange-500">ADMIN</span>
                </h2>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "bg-orange-500/10 text-orange-500"
                                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-zinc-800">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-zinc-400 hover:text-red-400 hover:bg-red-400/10"
                    onClick={handleLogout}
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
