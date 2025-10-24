import { MapPin, Package, Phone } from "lucide-react";
import { DeliveryBottomNav } from "@/components/DeliveryBottomNav";
import { Button } from "@/components/ui/button";

export default function DeliveryActive() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Map */}
      <div className="relative h-80 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">GPS - Mission en cours</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Mission info */}
        <div className="bg-card rounded-2xl p-5 border border-border animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-lg">Mission #M1245</h2>
            <span className="text-sm px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 font-medium">
              En cours
            </span>
          </div>

          <div className="space-y-4">
            {/* Pickup */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Ramassage</p>
                <p className="text-sm text-muted-foreground">Boutique Mamadou, Kaloum</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Appeler
                </Button>
              </div>
            </div>

            {/* Delivery */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Livraison</p>
                <p className="text-sm text-muted-foreground">Résidence Kaloum, Bloc A</p>
                <p className="text-sm text-muted-foreground">Mamadou Diallo - +224 XXX</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Appeler
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rémunération</p>
              <p className="font-heading font-bold text-xl text-primary">5 000 GNF</p>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
              Terminer la mission
            </Button>
          </div>
        </div>
      </div>

      <DeliveryBottomNav />
    </div>
  );
}
