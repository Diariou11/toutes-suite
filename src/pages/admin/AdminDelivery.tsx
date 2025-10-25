import { useState } from "react";
import { ArrowLeft, Truck, CheckCircle, XCircle, Eye, MapPin, Search } from "lucide-react";
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

const deliveryDrivers = [
  { id: 1, name: "Jean Haba", status: "online", deliveries: 234, rating: 4.9, zone: "Kaloum", earnings: "1.2M GNF" },
  { id: 2, name: "Mamadou Camara", status: "online", deliveries: 189, rating: 4.7, zone: "Ratoma", earnings: "980K GNF" },
  { id: 3, name: "Boubacar Diallo", status: "pending", deliveries: 0, rating: 0, zone: "Matoto", earnings: "0 GNF" },
  { id: 4, name: "Alsény Sylla", status: "offline", deliveries: 156, rating: 4.8, zone: "Dixinn", earnings: "820K GNF" },
  { id: 5, name: "Ousmane Bah", status: "online", deliveries: 298, rating: 4.9, zone: "Kaloum", earnings: "1.5M GNF" },
  { id: 6, name: "Thierno Sow", status: "pending", deliveries: 0, rating: 0, zone: "Matam", earnings: "0 GNF" },
];

export default function AdminDelivery() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDrivers = deliveryDrivers.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">En ligne</Badge>;
      case "offline":
        return <Badge className="bg-gray-500/10 text-gray-600 border-gray-500/20">Hors ligne</Badge>;
      case "pending":
        return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">En attente</Badge>;
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
            <h1 className="font-heading text-2xl font-bold">Gérer les Livreurs</h1>
          </div>
          <AdminMenu />
        </div>
        <p className="text-white/80">Supervision et validation des livreurs</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Rechercher un livreur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-2xl p-4 border border-border">
            <Truck className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-2xl font-heading font-bold">{deliveryDrivers.filter(d => d.status === "online").length}</p>
            <p className="text-xs text-muted-foreground">En ligne</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <Truck className="w-6 h-6 text-orange-600 mb-2" />
            <p className="text-2xl font-heading font-bold">{deliveryDrivers.filter(d => d.status === "pending").length}</p>
            <p className="text-xs text-muted-foreground">En attente</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <Truck className="w-6 h-6 text-gray-600 mb-2" />
            <p className="text-2xl font-heading font-bold">{deliveryDrivers.filter(d => d.status === "offline").length}</p>
            <p className="text-xs text-muted-foreground">Hors ligne</p>
          </div>
        </div>

        {/* Delivery Drivers Table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Livreur</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Livraisons</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Gains</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <p className="font-semibold">{driver.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {driver.zone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(driver.status)}</TableCell>
                  <TableCell>
                    <span className="font-semibold">{driver.deliveries}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{driver.rating > 0 ? `${driver.rating}⭐` : "N/A"}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">{driver.earnings}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {driver.status === "pending" && (
                        <>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
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
