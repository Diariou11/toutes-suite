import { useState } from "react";
import { ArrowLeft, Store, CheckCircle, XCircle, Eye, Edit, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import AdminMenu from "@/components/AdminMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const merchants = [
  { id: 1, name: "Saïdou Diallo", shop: "Pharmacie Centrale", status: "active", sales: "2.4M GNF", orders: 156, rating: 4.8 },
  { id: 2, name: "Mamadou Sylla", shop: "Boucherie du Marché", status: "active", sales: "1.8M GNF", orders: 98, rating: 4.5 },
  { id: 3, name: "Fatoumata Bah", shop: "Fruits & Légumes Bio", status: "pending", sales: "0 GNF", orders: 0, rating: 0 },
  { id: 4, name: "Ibrahima Sow", shop: "Électronique Plus", status: "active", sales: "3.2M GNF", orders: 234, rating: 4.9 },
  { id: 5, name: "Aissatou Diallo", shop: "Mode & Style", status: "suspended", sales: "890K GNF", orders: 45, rating: 3.2 },
];

export default function AdminMerchants() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMerchants = merchants.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.shop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Actif</Badge>;
      case "pending":
        return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">En attente</Badge>;
      case "suspended":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Suspendu</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/dashboard")}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="font-heading text-2xl font-bold">Gérer les Commerçants</h1>
          </div>
          <AdminMenu />
        </div>
        <p className="text-white/80">Supervision et validation des commerçants</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Rechercher un commerçant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-2xl p-4 border border-border">
            <Store className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-2xl font-heading font-bold">{merchants.filter(m => m.status === "active").length}</p>
            <p className="text-xs text-muted-foreground">Actifs</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <Store className="w-6 h-6 text-orange-600 mb-2" />
            <p className="text-2xl font-heading font-bold">{merchants.filter(m => m.status === "pending").length}</p>
            <p className="text-xs text-muted-foreground">En attente</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <Store className="w-6 h-6 text-red-600 mb-2" />
            <p className="text-2xl font-heading font-bold">{merchants.filter(m => m.status === "suspended").length}</p>
            <p className="text-xs text-muted-foreground">Suspendus</p>
          </div>
        </div>

        {/* Merchants Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commerçant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Ventes</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMerchants.map((merchant) => (
                <TableRow key={merchant.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <p className="font-semibold">{merchant.name}</p>
                      <p className="text-sm text-muted-foreground">{merchant.shop}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(merchant.status)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{merchant.sales}</p>
                      <p className="text-sm text-muted-foreground">{merchant.orders} commandes</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{merchant.rating > 0 ? `${merchant.rating}⭐` : "N/A"}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {merchant.status === "pending" && (
                        <>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {merchant.status === "active" && (
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
