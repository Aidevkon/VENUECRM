import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
}

export function StatsCard({ title, value, icon: Icon, description }: StatsCardProps) {
    return (
        <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-zinc-400">{title}</h3>
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div className="space-y-1">
                <div className="text-2xl font-bold text-white">{value}</div>
                {description && (
                    <p className="text-xs text-zinc-500">{description}</p>
                )}
            </div>
        </div>
    );
}
