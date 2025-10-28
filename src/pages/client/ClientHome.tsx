import { ShoppingCart, Clock, History, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { ChatSupport } from "@/components/ChatSupport";
import { ProductRecommendations } from "@/components/ProductRecommendations";

const shortcuts = [
  { icon: ShoppingCart, label: "Commander", path: "/client/catalog", color: "bg-primary text-primary-foreground" },
  { icon: Clock, label: "Suivi", path: "/client/tracking", color: "bg-blue-500 text-white" },
  { icon: History, label: "Historique", path: "/client/orders", color: "bg-orange-500 text-white" },
  { icon: Percent, label: "Promos", path: "/client/promo", color: "bg-secondary text-secondary-foreground" },
];

const promos = [
  { title: "20% de réduction", subtitle: "Sur votre première commande", image: "🎉" },
  { title: "Livraison gratuite", subtitle: "Pour les commandes de +50 000 GNF", image: "🚚" },
];

export default function ClientHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl">
        <h1 className="font-heading text-2xl font-bold mb-1">Bonjour !</h1>
        <p className="text-primary-foreground/80">Que souhaitez-vous commander aujourd'hui ?</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Shortcuts */}
        <div className="grid grid-cols-2 gap-4">
          {shortcuts.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-all active:scale-95"
            >
              <div className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <item.icon className="w-7 h-7" />
              </div>
              <p className="font-heading font-semibold text-center">{item.label}</p>
            </button>
          ))}
        </div>

        {/* AI Recommendations */}
        <ProductRecommendations browsedCategories={["Épicerie", "Fruits & Légumes"]} />

        {/* Promos */}
        <div className="space-y-3">
          <h2 className="font-heading text-lg font-bold">Promotions</h2>
          {promos.map((promo, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-2xl p-4 border border-secondary/20 flex items-center gap-4"
            >
              <div className="text-4xl">{promo.image}</div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-secondary">{promo.title}</h3>
                <p className="text-sm text-muted-foreground">{promo.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button variant="hero" size="lg" className="w-full" onClick={() => navigate("/client/catalog")}>
          Commencer mes achats
        </Button>
      </div>

      <ChatSupport />
      <BottomNav />
    </div>
  );
}
