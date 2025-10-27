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
            className="bg-card rounded-2xl p-4 border border-border hover:shadow-md transition-shadow relative overflow-hidden"
          >
            {/* Visual route indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-orange-500" />
            
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Départ</p>
                    <p className="font-heading font-semibold">{mission.from}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pl-2">
                  <div className="h-8 w-0.5 bg-border ml-3" />
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-orange-500/10 p-2 rounded-lg shrink-0">
                    <MapPin className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Arrivée</p>
                    <p className="font-heading font-semibold">{mission.to}</p>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="font-heading font-bold text-primary text-xl">{mission.earning}</p>
                <p className="text-xs text-muted-foreground">GNF</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-3 bg-muted/50 p-2 rounded-lg">
              <div className="flex items-center gap-1 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-medium">{mission.distance}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-medium">{mission.time}</span>
              </div>
              <div className="flex items-center gap-1 text-sm ml-auto">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="font-medium">{(parseFloat(mission.earning.replace(/\s/g, "")) / parseFloat(mission.distance.replace(" km", ""))).toFixed(0)}/km</span>
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
