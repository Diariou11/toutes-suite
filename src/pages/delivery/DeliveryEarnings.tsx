import { DollarSign, TrendingUp, Award, Target } from "lucide-react";
import { DeliveryBottomNav } from "@/components/DeliveryBottomNav";

const stats = [
  { label: "Aujourd'hui", value: "45 000 GNF", icon: DollarSign, color: "text-primary" },
  { label: "Cette semaine", value: "285 000 GNF", icon: TrendingUp, color: "text-blue-500" },
  { label: "Missions complétées", value: "57", icon: Target, color: "text-orange-500" },
  { label: "Note moyenne", value: "4.8⭐", icon: Award, color: "text-secondary" },
];

const badges = [
  { name: "Rapide", icon: "⚡", earned: true },
  { name: "Fiable", icon: "🎯", earned: true },
  { name: "Pro", icon: "👑", earned: false },
];

export default function DeliveryEarnings() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl">
        <h1 className="font-heading text-2xl font-bold mb-1">Mes Revenus</h1>
        <p className="text-primary-foreground/80">Performances & Gains</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl p-4 border border-border animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
              <p className="text-2xl font-heading font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="bg-card rounded-2xl p-5 border border-border animate-slide-up">
          <h2 className="font-heading font-bold text-lg mb-4">Mes Badges</h2>
          <div className="flex gap-4">
            {badges.map((badge, idx) => (
              <div
                key={idx}
                className={`flex-1 text-center p-4 rounded-xl border ${
                  badge.earned
                    ? "bg-primary/5 border-primary"
                    : "bg-muted border-border opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className="text-sm font-medium">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly chart */}
        <div className="bg-card rounded-2xl p-5 border border-border">
          <h2 className="font-heading font-bold text-lg mb-4">Cette semaine</h2>
          <div className="h-40 flex items-end justify-between gap-2">
            {[
              { height: 40, amount: "28K" },
              { height: 65, amount: "42K" },
              { height: 50, amount: "35K" },
              { height: 80, amount: "52K" },
              { height: 70, amount: "48K" },
              { height: 90, amount: "58K" },
              { height: 75, amount: "50K" }
            ].map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-primary mb-1">{day.amount}</span>
                <div
                  className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${day.height}%` }}
                />
                <span className="text-xs text-muted-foreground">
                  {["L", "M", "M", "J", "V", "S", "D"][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DeliveryBottomNav />
    </div>
  );
}
