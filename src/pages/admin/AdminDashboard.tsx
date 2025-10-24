import { Users, Store, Truck, TrendingUp, AlertCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const kpis = [
  { label: "Commandes aujourd'hui", value: "1,247", icon: TrendingUp, trend: "+12%" },
  { label: "Commerçants actifs", value: "328", icon: Store, trend: "+5%" },
  { label: "Livreurs en ligne", value: "89", icon: Truck, trend: "+8%" },
  { label: "Taux de satisfaction", value: "4.6⭐", icon: Users, trend: "+0.2" },
];

const alerts = [
  { type: "warning", message: "5 commerçants en attente de validation", action: "Voir" },
  { type: "info", message: "12 livreurs en attente de validation", action: "Voir" },
  { type: "error", message: "3 litiges en cours nécessitent votre attention", action: "Résoudre" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-heading text-2xl font-bold">Administration</h1>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <p className="text-white/80">Vue d'ensemble de la plateforme</p>
      </div>

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-card rounded-2xl p-4 border border-border">
              <div className="flex items-start justify-between mb-2">
                <kpi.icon className="w-6 h-6 text-primary" />
                <span className="text-xs font-semibold text-primary">{kpi.trend}</span>
              </div>
              <p className="text-2xl font-heading font-bold mb-1">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Alerts */}
        <div className="space-y-3">
          <h2 className="font-heading text-lg font-bold">Alertes</h2>
          {alerts.map((alert, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-4 border flex items-start gap-3 ${
                alert.type === "error"
                  ? "bg-red-500/10 border-red-500/20"
                  : alert.type === "warning"
                  ? "bg-orange-500/10 border-orange-500/20"
                  : "bg-blue-500/10 border-blue-500/20"
              }`}
            >
              <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${
                alert.type === "error"
                  ? "text-red-600"
                  : alert.type === "warning"
                  ? "text-orange-600"
                  : "text-blue-600"
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">{alert.message}</p>
                <Button size="sm" variant="outline" className="h-8">
                  {alert.action}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="font-heading text-lg font-bold">Actions rapides</h2>
          <div className="grid gap-3">
            <Button 
              onClick={() => navigate("/admin/merchants")}
              className="h-14 justify-start"
            >
              <Store className="w-5 h-5 mr-2" />
              Gérer les commerçants
            </Button>
            <Button 
              onClick={() => navigate("/admin/delivery")}
              variant="outline"
              className="h-14 justify-start"
            >
              <Truck className="w-5 h-5 mr-2" />
              Gérer les livreurs
            </Button>
            <Button 
              onClick={() => navigate("/admin/reporting")}
              variant="outline"
              className="h-14 justify-start"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Voir les rapports
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
