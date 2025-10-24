import { Search, ShoppingBag, Apple, Pill, Home as HomeIcon, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";

const categories = [
  { icon: ShoppingBag, name: "Épicerie", count: "250+ produits", color: "bg-green-500" },
  { icon: Apple, name: "Fruits & Légumes", count: "80+ produits", color: "bg-orange-500" },
  { icon: Pill, name: "Pharmacie", count: "120+ produits", color: "bg-red-500" },
  { icon: HomeIcon, name: "Maison", count: "200+ produits", color: "bg-blue-500" },
  { icon: Wrench, name: "Électronique", count: "150+ produits", color: "bg-purple-500" },
  { icon: ShoppingBag, name: "Mode", count: "300+ produits", color: "bg-pink-500" },
];

export default function Catalog() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10 p-4 space-y-3">
        <h1 className="font-heading text-2xl font-bold">Catalogue</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un produit..."
            className="pl-11 h-11"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => navigate("/client/products")}
            className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-all active:scale-95 text-left"
          >
            <div className={`${category.color} text-white w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
              <category.icon className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-semibold mb-1">{category.name}</h3>
            <p className="text-xs text-muted-foreground">{category.count}</p>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
