import { ShoppingBag, Store, Bike, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const roles = [
  {
    icon: ShoppingBag,
    title: "Client",
    description: "Commandez vos produits préférés",
    color: "bg-primary/10 text-primary",
    path: "/auth/client",
  },
  {
    icon: Store,
    title: "Commerçant",
    description: "Vendez et gérez votre boutique",
    color: "bg-blue-500/10 text-blue-600",
    path: "/auth/merchant",
  },
  {
    icon: Bike,
    title: "Livreur",
    description: "Gagnez de l'argent en livrant",
    color: "bg-orange-500/10 text-orange-600",
    path: "/auth/delivery",
  },
  {
    icon: Shield,
    title: "Admin",
    description: "Gérez la plateforme",
    color: "bg-purple-500/10 text-purple-600",
    path: "/auth/admin",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-background flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4 animate-slide-up">
          <img src={logo} alt="TOUTES SUITE" className="h-32 mx-auto" />
          <h1 className="font-heading text-3xl font-bold text-foreground">
            TOUTES SUITE
          </h1>
          <p className="text-secondary font-medium text-lg">
            Vos courses, notre mission
          </p>
        </div>

        {/* Role selection */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-center text-xl font-heading font-semibold text-foreground">
            Je suis un...
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {roles.map((role) => (
              <button
                key={role.title}
                onClick={() => navigate(role.path)}
                className="group bg-card rounded-2xl p-6 border-2 border-border hover:border-primary transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                <div
                  className={`${role.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                >
                  <role.icon className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  {role.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-snug">
                  {role.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Une super-app 100% guinéenne</p>
        </div>
      </div>
    </div>
  );
}
