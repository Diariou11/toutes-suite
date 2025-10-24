import { Package, Clock, CheckCircle } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const orders = [
  {
    id: "#12456",
    date: "Aujourd'hui, 14:30",
    items: 3,
    total: "45 000 GNF",
    status: "En cours",
    icon: Clock,
    color: "text-orange-500",
  },
  {
    id: "#12455",
    date: "Hier, 18:20",
    items: 5,
    total: "78 500 GNF",
    status: "Livrée",
    icon: CheckCircle,
    color: "text-primary",
  },
  {
    id: "#12454",
    date: "23 Oct, 16:45",
    items: 2,
    total: "32 000 GNF",
    status: "Livrée",
    icon: CheckCircle,
    color: "text-primary",
  },
];

export default function ClientOrders() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl">
        <h1 className="font-heading text-2xl font-bold">Mes Commandes</h1>
        <p className="text-primary-foreground/80">Historique de vos achats</p>
      </div>

      <div className="p-6 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-card rounded-2xl p-5 border border-border hover:shadow-lg transition-all animate-fade-in"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-heading font-bold text-lg">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <order.icon className={`w-6 h-6 ${order.color}`} />
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{order.items} articles</p>
              <p className="font-heading font-bold text-primary">{order.total}</p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex-1">
                Détails
              </Button>
              {order.status === "Livrée" && (
                <Button size="sm" className="flex-1">
                  Re-commander
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
