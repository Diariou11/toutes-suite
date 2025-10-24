import { MapPin, Phone, Navigation } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

export default function ClientTracking() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Map placeholder */}
      <div className="relative h-96 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carte GPS - En cours de livraison</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Delivery info */}
        <div className="bg-card rounded-2xl p-5 border border-border animate-slide-up">
          <h2 className="font-heading font-bold text-lg mb-4">Livraison en cours</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Navigation className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Mamadou Diallo</p>
                <p className="text-sm text-muted-foreground">Arrive dans 12 min</p>
              </div>
              <Button size="icon" variant="outline">
                <Phone className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-card rounded-2xl p-5 border border-border animate-fade-in">
          <h3 className="font-heading font-semibold mb-4">Suivi</h3>
          <div className="space-y-4">
            {[
              { label: "Commande confirmée", time: "14:30", done: true },
              { label: "En préparation", time: "14:35", done: true },
              { label: "En livraison", time: "15:00", done: true },
              { label: "Livrée", time: "15:15", done: false },
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    step.done ? "bg-primary border-primary" : "border-border"
                  }`}
                />
                <div className="flex-1">
                  <p className={step.done ? "font-medium" : "text-muted-foreground"}>
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
