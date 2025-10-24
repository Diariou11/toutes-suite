import { User, MapPin, CreditCard, Bell, HelpCircle, LogOut, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: Store, label: "Ma boutique", path: "#" },
  { icon: User, label: "Informations", path: "#" },
  { icon: MapPin, label: "Adresse", path: "#" },
  { icon: CreditCard, label: "Paiements", path: "#" },
  { icon: Bell, label: "Notifications", path: "#" },
  { icon: HelpCircle, label: "Aide", path: "#" },
];

export default function MerchantProfile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-secondary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Store className="w-10 h-10" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold">Saïdou Diallo</h1>
            <p className="text-primary-foreground/80">Commerçant</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className="w-full bg-card rounded-2xl p-4 border border-border flex items-center gap-4 hover:shadow-md transition-all active:scale-95 animate-fade-in"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <item.icon className="w-6 h-6 text-secondary" />
            </div>
            <span className="flex-1 text-left font-medium text-lg">{item.label}</span>
          </button>
        ))}

        <button
          onClick={() => navigate("/")}
          className="w-full bg-destructive/10 rounded-2xl p-4 border border-destructive/20 flex items-center gap-4 hover:bg-destructive/20 transition-all active:scale-95"
        >
          <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
            <LogOut className="w-6 h-6 text-destructive" />
          </div>
          <span className="flex-1 text-left font-medium text-lg text-destructive">Déconnexion</span>
        </button>
      </div>
    </div>
  );
}
