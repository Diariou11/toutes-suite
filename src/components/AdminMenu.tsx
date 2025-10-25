import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LayoutDashboard, Store, Truck, TrendingUp, AlertCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Tableau de bord", path: "/admin/dashboard" },
    { icon: Store, label: "Gérer les commerçants", path: "/admin/merchants" },
    { icon: Truck, label: "Gérer les livreurs", path: "/admin/delivery" },
    { icon: TrendingUp, label: "Voir les rapports", path: "/admin/reporting" },
    { icon: AlertCircle, label: "Litiges", path: "/admin/disputes" },
    { icon: Users, label: "Validations", path: "/admin/validations" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">Menu Admin</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "default" : "ghost"}
              className="w-full justify-start h-12"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
