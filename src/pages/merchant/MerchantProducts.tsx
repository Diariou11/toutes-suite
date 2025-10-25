import { Plus, Edit, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Riz 25kg", price: "250 000", stock: 45, image: "🌾" },
  { id: 2, name: "Huile 5L", price: "75 000", stock: 23, image: "🛢️" },
  { id: 3, name: "Sucre 1kg", price: "12 000", stock: 67, image: "🧂" },
  { id: 4, name: "Farine 10kg", price: "85 000", stock: 34, image: "🍞" },
  { id: 5, name: "Lait en poudre", price: "45 000", stock: 56, image: "🥛" },
  { id: 6, name: "Café 500g", price: "38 000", stock: 89, image: "☕" },
  { id: 7, name: "Thé 250g", price: "15 000", stock: 102, image: "🍵" },
  { id: 8, name: "Pâtes 1kg", price: "18 000", stock: 78, image: "🍝" },
  { id: 9, name: "Tomate concentré", price: "8 000", stock: 134, image: "🍅" },
  { id: 10, name: "Sel 1kg", price: "5 000", stock: 156, image: "🧂" },
];

export default function MerchantProducts() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/merchant/dashboard")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Package className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="font-heading text-2xl font-bold">Mes Produits</h1>
              <p className="text-primary-foreground/80">{products.length} produits</p>
            </div>
          </div>
          <Button
            size="icon"
            className="bg-primary-foreground text-primary rounded-full"
            onClick={() => alert("Ajouter un produit")}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {products.map((product, idx) => (
          <div
            key={product.id}
            className="bg-card rounded-2xl p-4 border border-border animate-fade-in"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center text-4xl flex-shrink-0">
                {product.image}
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-primary font-bold mb-2">{product.price} GNF</p>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="icon" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
