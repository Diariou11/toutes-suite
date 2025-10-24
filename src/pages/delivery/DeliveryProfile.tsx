import { User, Bike, FileText, Settings, HelpCircle, LogOut } from "lucide-react";
import { DeliveryBottomNav } from "@/components/DeliveryBottomNav";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: User, label: "Informations personnelles" },
  { icon: Bike, label: "Mon véhicule" },
  { icon: FileText, label: "Documents" },
  { icon: Settings, label: "Paramètres" },
  { icon: HelpCircle, label: "Aide & Support" },
];

export default function DeliveryProfile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <User className="w-10 h-10" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold">Ibrahima Sow</h1>
            <p className="text-primary-foreground/80">Livreur Certifié</p>
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
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="flex-1 text-left font-medium">{item.label}</span>
          </button>
        ))}

        <button
          onClick={() => navigate("/")}
          className="w-full bg-destructive/10 rounded-2xl p-4 border border-destructive/20 flex items-center gap-4 hover:bg-destructive/20 transition-all active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-destructive" />
          </div>
          <span className="flex-1 text-left font-medium text-destructive">Déconnexion</span>
        </button>
      </div>

      <DeliveryBottomNav />
    </div>
  );
}
