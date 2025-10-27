import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner";

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/\s/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    toast.success("Commande validée !");
    clearCart();
    navigate("/client/orders");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/client/home")}
              className="text-primary-foreground hover:bg-primary-foreground/10 min-w-[44px] min-h-[44px]"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="font-heading text-2xl font-bold">Mon Panier</h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-20 px-6">
          <ShoppingBag className="w-24 h-24 text-muted-foreground/30 mb-6" />
          <h2 className="font-heading text-xl font-bold mb-2">Panier vide</h2>
          <p className="text-muted-foreground text-center mb-6">
            Ajoutez des produits pour commencer
          </p>
          <Button onClick={() => navigate("/client/catalog")}>
            Parcourir le catalogue
          </Button>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-primary-foreground/10 min-w-[44px] min-h-[44px]"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="font-heading text-2xl font-bold">Mon Panier</h1>
        </div>
        <p className="text-primary-foreground/80">{items.length} article(s)</p>
      </div>

      <div className="p-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-card rounded-2xl p-4 border border-border"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold mb-1">{item.name}</h3>
                <p className="font-heading font-bold text-primary">
                  {item.price} GNF
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="shrink-0 text-destructive hover:text-destructive min-w-[44px] min-h-[44px]"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="min-w-[44px] min-h-[44px]"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-heading font-bold text-lg w-12 text-center">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="min-w-[44px] min-h-[44px]"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="font-heading font-bold text-lg">
                {(parseFloat(item.price.replace(/\s/g, "")) * item.quantity).toLocaleString()} GNF
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed bottom summary */}
      <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4 z-40">
        <div className="max-w-screen-sm mx-auto space-y-3">
          <div className="flex items-center justify-between text-lg">
            <span className="font-heading font-semibold">Total</span>
            <span className="font-heading font-bold text-primary text-xl">
              {total.toLocaleString()} GNF
            </span>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={handleCheckout}
          >
            Valider la commande
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
