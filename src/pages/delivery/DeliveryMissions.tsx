import { MapPin, DollarSign, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeliveryBottomNav } from "@/components/DeliveryBottomNav";
import { useNavigate } from "react-router-dom";
import { RouteOptimizer } from "@/components/RouteOptimizer";

const missions = [
  { id: 1, distance: "3.2 km", earning: "15 000", time: "25 min", from: "Kaloum", to: "Ratoma" },
  { id: 2, distance: "5.8 km", earning: "22 000", time: "35 min", from: "Dixinn", to: "Matoto" },
  { id: 3, distance: "2.1 km", earning: "12 000", time: "15 min", from: "Matam", to: "Kaloum" },
  { id: 4, distance: "7.5 km", earning: "28 000", time: "45 min", from: "Ratoma", to: "Dixinn" },
];

export default function DeliveryMissions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl">
        <h1 className="font-heading text-2xl font-bold mb-1">Missions disponibles</h1>
        <p className="text-primary-foreground/80">Sélectionnez une mission pour commencer</p>
      </div>

      <div className="p-4 space-y-4">
        {/* AI Route Optimizer */}
        <RouteOptimizer 
          missions={missions.map(m => ({ 
            id: m.id.toString(), 
            origin: m.from, 
            destination: m.to, 
            distance: m.distance, 
            earning: m.earning, 
            time: m.time 
          }))} 
        />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <p className="text-2xl font-heading font-bold text-primary">12</p>
            <p className="text-xs text-muted-foreground">Aujourd'hui</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <p className="text-2xl font-heading font-bold text-primary">87</p>
            <p className="text-xs text-muted-foreground">Cette semaine</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <p className="text-2xl font-heading font-bold text-primary">4.8⭐</p>
            <p className="text-xs text-muted-foreground">Note</p>
          </div>
        </div>
      </div>

      {/* Missions List */}
      <div className="p-4 space-y-3">
        <h2 className="font-heading text-lg font-bold mb-3">À proximité</h2>
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="bg-card rounded-2xl p-4 border border-border hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium">{mission.from}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-medium">{mission.to}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-heading font-bold text-primary text-lg">{mission.earning} GNF</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{mission.distance}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{mission.time}</span>
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={() => navigate("/delivery/active")}
            >
              Accepter la mission
            </Button>
          </div>
        ))}
      </div>

      <DeliveryBottomNav />
    </div>
  );
}
