import { Tag, Apple, Pill, ShoppingBag, Home as HomeIcon } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Badge } from "@/components/ui/badge";

const promos = [
  {
    category: "Fruits & Légumes",
    icon: Apple,
    color: "bg-orange-500",
    items: [
      { name: "Mangues", original: "10 000", promo: "7 000", discount: "-30%" },
      { name: "Avocats", original: "8 000", promo: "6 000", discount: "-25%" },
      { name: "Papayes", original: "5 000", promo: "3 500", discount: "-30%" }
    ]
  },
  {
    category: "Pharmacie",
    icon: Pill,
    color: "bg-red-500",
    items: [
      { name: "Paracétamol", original: "2 500", promo: "2 000", discount: "-20%" },
      { name: "Vitamine C", original: "5 000", promo: "4 000", discount: "-20%" },
      { name: "Sirop toux", original: "8 000", promo: "6 500", discount: "-19%" }
    ]
  },
  {
    category: "Épicerie",
    icon: ShoppingBag,
    color: "bg-green-500",
    items: [
      { name: "Riz 25kg", original: "45 000", promo: "38 000", discount: "-15%" },
      { name: "Huile 5L", original: "25 000", promo: "20 000", discount: "-20%" },
      { name: "Sucre 1kg", original: "7 000", promo: "5 500", discount: "-21%" }
    ]
  },
  {
    category: "Maison",
    icon: HomeIcon,
    color: "bg-blue-500",
    items: [
      { name: "Détergent", original: "12 000", promo: "9 000", discount: "-25%" },
      { name: "Savon lot x6", original: "8 000", promo: "6 000", discount: "-25%" },
      { name: "Éponges x10", original: "3 000", promo: "2 000", discount: "-33%" }
    ]
  }
];

export default function Promo() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-2">
          <Tag className="w-8 h-8 animate-pulse" />
          <h1 className="font-heading text-2xl font-bold">Promotions</h1>
        </div>
        <p className="text-primary-foreground/80">
          Les meilleures offres du moment
        </p>
      </div>

      {/* Promo Sections */}
      <div className="p-4 space-y-6">
        {promos.map((section, idx) => (
          <div 
            key={section.category}
            className="animate-fade-in"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`${section.color} text-white w-10 h-10 rounded-xl flex items-center justify-center`}>
                <section.icon className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-lg font-bold">{section.category}</h2>
            </div>

            <div className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="bg-card rounded-2xl p-4 border border-border hover:shadow-md transition-all relative overflow-hidden"
                >
                  <Badge 
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground animate-pulse"
                  >
                    {item.discount}
                  </Badge>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading font-semibold mb-2">{item.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground line-through">
                          {item.original} GNF
                        </span>
                        <span className="font-heading font-bold text-primary text-lg">
                          {item.promo} GNF
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
