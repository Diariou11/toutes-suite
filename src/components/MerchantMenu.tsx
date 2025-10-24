import { Home, Package, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navItems = [
  { icon: Home, label: "Tableau de bord", path: "/merchant/dashboard" },
  { icon: Package, label: "Mes produits", path: "/merchant/products" },
  { icon: ShoppingCart, label: "Commandes", path: "/merchant/orders" },
  { icon: User, label: "Profil", path: "/merchant/profile" },
];

export function MerchantMenu() {
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <div className="py-6">
          <h2 className="font-heading text-xl font-bold mb-6 px-2">Menu Commerçant</h2>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors",
                    isActive 
                      ? "bg-secondary text-secondary-foreground" 
                      : "hover:bg-muted"
                  )}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="font-medium text-lg">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
