import { Home, ShoppingCart, MapPin, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

const navItems = [
  { icon: Home, label: "Accueil", path: "/client/home" },
  { icon: ShoppingCart, label: "Panier", path: "/client/cart", badge: true },
  { icon: MapPin, label: "Suivi", path: "/client/tracking" },
  { icon: User, label: "Profil", path: "/client/profile" },
];

export function BottomNav() {
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-screen-sm mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors min-h-[44px] relative",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <item.icon className={cn("w-6 h-6", isActive && "stroke-[2.5]")} />
                {item.badge && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
