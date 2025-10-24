import { Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const orders = [
  { id: "#12456", customer: "Mamadou D.", amount: "45 000", items: 3, status: "pending" },
  { id: "#12455", customer: "Fatoumata K.", amount: "32 000", items: 2, status: "accepted" },
  { id: "#12454", customer: "Ibrahima S.", amount: "67 000", items: 5, status: "ready" },
];

export default function MerchantOrders() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl">
        <h1 className="font-heading text-2xl font-bold mb-1">Commandes</h1>
        <p className="text-primary-foreground/80">Gérez vos commandes</p>
      </div>

      <div className="p-6 space-y-4">
        {orders.map((order, idx) => (
          <div
            key={order.id}
            className="bg-card rounded-2xl p-5 border border-border animate-fade-in"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-heading font-bold text-lg">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.customer}</p>
                <p className="text-sm text-muted-foreground">{order.items} articles</p>
              </div>
              <div className="text-right">
                <p className="font-heading font-bold text-xl text-primary">{order.amount}</p>
                <p className="text-sm text-muted-foreground">GNF</p>
              </div>
            </div>

            {order.status === "pending" && (
              <div className="flex gap-3">
                <Button size="sm" variant="destructive" className="flex-1">
                  <X className="w-4 h-4 mr-2" />
                  Refuser
                </Button>
                <Button size="sm" className="flex-1">
                  <Check className="w-4 h-4 mr-2" />
                  Accepter
                </Button>
              </div>
            )}

            {order.status === "accepted" && (
              <Button size="sm" className="w-full">
                <Clock className="w-4 h-4 mr-2" />
                Marquer comme prête
              </Button>
            )}

            {order.status === "ready" && (
              <div className="text-center py-2 px-4 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium text-primary">En attente du livreur</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
