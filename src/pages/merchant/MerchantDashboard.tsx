import { Package, ShoppingCart, DollarSign, TrendingUp, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Ventes du jour", value: "450 000 GNF", icon: DollarSign, color: "text-primary" },
  { label: "Commandes en attente", value: "12", icon: ShoppingCart, color: "text-orange-500" },
  { label: "Produits actifs", value: "87", icon: Package, color: "text-blue-500" },
  { label: "Taux de satisfaction", value: "4.7⭐", icon: TrendingUp, color: "text-secondary" },
];

const recentOrders = [
  { id: "#12453", customer: "Mamadou D.", amount: "35 000", status: "En attente", time: "Il y a 5 min" },
  { id: "#12452", customer: "Fatoumata K.", amount: "52 000", status: "Acceptée", time: "Il y a 12 min" },
  { id: "#12451", customer: "Ibrahima S.", amount: "28 000", status: "Prête", time: "Il y a 25 min" },
];

export default function MerchantDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-heading text-2xl font-bold">Ma Boutique</h1>
          <button className="p-2 hover:bg-primary-light rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <p className="text-primary-foreground/80">Tableau de bord</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl p-4 border border-border">
              <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
              <p className="text-2xl font-heading font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="font-heading text-lg font-bold">Actions rapides</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={() => navigate("/merchant/products")}
              className="h-14"
            >
              Mes produits
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/merchant/orders")}
              className="h-14"
            >
              Commandes
            </Button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="space-y-3">
          <h2 className="font-heading text-lg font-bold">Commandes récentes</h2>
          {recentOrders.map((order) => (
            <div key={order.id} className="bg-card rounded-2xl p-4 border border-border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-heading font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                </div>
                <p className="font-heading font-bold text-primary">{order.amount} GNF</p>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === "En attente" 
                    ? "bg-orange-500/10 text-orange-600" 
                    : order.status === "Acceptée"
                    ? "bg-blue-500/10 text-blue-600"
                    : "bg-primary/10 text-primary"
                }`}>
                  {order.status}
                </span>
                <span className="text-xs text-muted-foreground">{order.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
