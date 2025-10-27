import { Plus, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const products = [
  { id: 1, name: "Riz blanc parfumé", price: "45 000", unit: "25kg", image: "🍚" },
  { id: 2, name: "Huile de palme", price: "25 000", unit: "5L", image: "🥘" },
  { id: 3, name: "Tomates fraîches", price: "5 000", unit: "1kg", image: "🍅" },
  { id: 4, name: "Oignons", price: "3 500", unit: "1kg", image: "🧅" },
  { id: 5, name: "Poulet entier", price: "35 000", unit: "1 pièce", image: "🍗" },
  { id: 6, name: "Pain de mie", price: "8 000", unit: "500g", image: "🍞" },
];

export default function Products() {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const addToCart = (product: typeof products[0]) => {
    addItem({ id: product.id, name: product.name, price: product.price });
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
            onClick={() => navigate(-1)}
            className="min-w-[44px] min-h-[44px]"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="font-heading text-2xl font-bold">Épicerie</h1>
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
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-card rounded-2xl p-4 border border-border hover:shadow-md transition-shadow flex items-center gap-4"
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
              className="shrink-0 min-w-[44px] min-h-[44px]"
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
