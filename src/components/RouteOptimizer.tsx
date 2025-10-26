import { useState } from "react";
import { Zap, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Mission {
  id: string;
  origin: string;
  destination: string;
  distance: string;
  earning: string;
  time: string;
}

interface OptimizedMission extends Mission {
  order: number;
  estimatedTime: string;
}

interface RouteOptimizerProps {
  missions: Mission[];
  onOptimized?: (optimized: OptimizedMission[]) => void;
}

export function RouteOptimizer({ missions, onOptimized }: RouteOptimizerProps) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState<any>(null);
  const { toast } = useToast();

  const optimizeRoute = async () => {
    setIsOptimizing(true);
    try {
      const { data, error } = await supabase.functions.invoke("optimize-route", {
        body: {
          missions: missions.map(m => ({
            id: m.id,
            origin: m.origin,
            destination: m.destination,
            distance: m.distance,
            earning: m.earning,
          })),
          currentLocation: "Conakry Centre", // Could be dynamic
        },
      });

      if (error) throw error;

      setOptimizedRoute(data);
      
      if (onOptimized && data.optimizedMissions) {
        onOptimized(data.optimizedMissions);
      }

      toast({
        title: "Itinéraire optimisé !",
        description: `Gains: ${data.totalEarnings} | Temps: ${data.totalTime}`,
      });
    } catch (error) {
      console.error("Route optimization error:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'optimiser l'itinéraire.",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={optimizeRoute}
        disabled={isOptimizing || missions.length === 0}
        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
      >
        <Zap className="w-4 h-4 mr-2" />
        {isOptimizing ? "Optimisation..." : "Optimiser mon itinéraire IA"}
      </Button>

      {optimizedRoute && (
        <Card className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-bold">Itinéraire Optimisé</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Distance</p>
                <p className="font-bold text-sm">{optimizedRoute.totalDistance}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Temps</p>
                <p className="font-bold text-sm">{optimizedRoute.totalTime}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Gains</p>
                <p className="font-bold text-sm text-green-600">{optimizedRoute.totalEarnings}</p>
              </div>
            </div>
            {optimizedRoute.recommendations && optimizedRoute.recommendations.length > 0 && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-semibold mb-2">Conseils :</p>
                {optimizedRoute.recommendations.map((rec: string, idx: number) => (
                  <p key={idx} className="text-xs text-muted-foreground">• {rec}</p>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
