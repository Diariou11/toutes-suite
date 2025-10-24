import { Plus, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";

const productsByCategory: Record<string, any[]> = {
  "Épicerie": [
    { id: 1, name: "Riz blanc parfumé", price: "45 000", unit: "25kg", image: "🍚" },
    { id: 2, name: "Huile de palme", price: "25 000", unit: "5L", image: "🥘" },
    { id: 3, name: "Tomates fraîches", price: "5 000", unit: "1kg", image: "🍅" },
    { id: 4, name: "Oignons", price: "3 500", unit: "1kg", image: "🧅" },
    { id: 5, name: "Poulet entier", price: "35 000", unit: "1 pièce", image: "🍗" },
    { id: 6, name: "Pain de mie", price: "8 000", unit: "500g", image: "🍞" },
  ],
  "Fruits & Légumes": [
    { id: 7, name: "Oranges", price: "8 000", unit: "1kg", image: "🍊" },
    { id: 8, name: "Mangues", price: "10 000", unit: "1kg", image: "🥭" },
    { id: 9, name: "Avocats", price: "8 000", unit: "1kg", image: "🥑" },
    { id: 10, name: "Papayes", price: "5 000", unit: "1 pièce", image: "🫐" },
    { id: 11, name: "Bananes", price: "4 000", unit: "1kg", image: "🍌" },
    { id: 12, name: "Ananas", price: "6 000", unit: "1 pièce", image: "🍍" },
  ],
  "Pharmacie": [
    { id: 13, name: "Paracétamol", price: "2 500", unit: "boîte", image: "💊" },
    { id: 14, name: "Vitamine C", price: "5 000", unit: "boîte", image: "💊" },
    { id: 15, name: "Sirop contre la toux", price: "8 000", unit: "flacon", image: "🍶" },
    { id: 16, name: "Pansements", price: "3 000", unit: "boîte", image: "🩹" },
    { id: 17, name: "Antiseptique", price: "4 500", unit: "flacon", image: "🧴" },
    { id: 18, name: "Thermomètre", price: "12 000", unit: "pièce", image: "🌡️" },
  ],
  "Maison": [
    { id: 19, name: "Détergent lessive", price: "12 000", unit: "2kg", image: "🧼" },
    { id: 20, name: "Savon de toilette", price: "8 000", unit: "lot de 6", image: "🧴" },
    { id: 21, name: "Éponges", price: "3 000", unit: "lot de 10", image: "🧽" },
    { id: 22, name: "Balai", price: "5 000", unit: "pièce", image: "🧹" },
    { id: 23, name: "Serpillière", price: "4 000", unit: "pièce", image: "🧺" },
    { id: 24, name: "Désinfectant", price: "6 500", unit: "1L", image: "🧴" },
  ],
  "Électronique": [
    { id: 25, name: "Chargeur USB", price: "15 000", unit: "pièce", image: "🔌" },
    { id: 26, name: "Écouteurs", price: "25 000", unit: "pièce", image: "🎧" },
    { id: 27, name: "Câble HDMI", price: "18 000", unit: "pièce", image: "📱" },
    { id: 28, name: "Clé USB 32GB", price: "20 000", unit: "pièce", image: "💾" },
    { id: 29, name: "Souris sans fil", price: "35 000", unit: "pièce", image: "🖱️" },
    { id: 30, name: "Batterie externe", price: "45 000", unit: "pièce", image: "🔋" },
  ],
  "Mode": [
    { id: 31, name: "T-shirt coton", price: "25 000", unit: "pièce", image: "👕" },
    { id: 32, name: "Jean homme", price: "45 000", unit: "pièce", image: "👖" },
    { id: 33, name: "Robe femme", price: "55 000", unit: "pièce", image: "👗" },
    { id: 34, name: "Baskets", price: "75 000", unit: "paire", image: "👟" },
    { id: 35, name: "Sac à main", price: "40 000", unit: "pièce", image: "👜" },
    { id: 36, name: "Casquette", price: "15 000", unit: "pièce", image: "🧢" },
  ],
};

export default function ProductsByCategory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "Épicerie";
  const products = productsByCategory[category] || [];

  const addToCart = (product: typeof products[0]) => {
    toast.success(`${product.name} ajouté au panier`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10 p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/client/catalog")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-heading text-2xl font-bold">{category}</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="pl-11 h-11"
          />
        </div>
      </div>

      {/* Products List */}
      <div className="p-4 space-y-3">
        {products.map((product, idx) => (
          <div
            key={product.id}
            className="bg-card rounded-2xl p-4 border border-border hover:shadow-md transition-shadow flex items-center gap-4 animate-fade-in"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="bg-muted w-20 h-20 rounded-xl flex items-center justify-center text-4xl">
              {product.image}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-semibold mb-1 truncate">{product.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{product.unit}</p>
              <p className="font-heading font-bold text-primary">{product.price} GNF</p>
            </div>
            <Button
              size="icon"
              onClick={() => addToCart(product)}
              className="shrink-0"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
