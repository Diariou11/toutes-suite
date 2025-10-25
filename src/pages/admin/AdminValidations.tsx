import { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, Eye, Search, Clock } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const pendingMerchants = [
  { id: 1, name: "Fatoumata Bah", shop: "Fruits & Légumes Bio", type: "Commerçant", submitted: "Il y a 2h", documents: "Complet" },
  { id: 2, name: "Alsény Camara", shop: "Boulangerie Moderne", type: "Commerçant", submitted: "Il y a 5h", documents: "Complet" },
  { id: 3, name: "Mariama Diallo", shop: "Mode Africaine", type: "Commerçant", submitted: "Il y a 1j", documents: "Incomplet" },
];

const pendingDelivery = [
  { id: 1, name: "Mohamed Touré", vehicle: "Moto", type: "Livreur", submitted: "Il y a 3h", documents: "Complet" },
  { id: 2, name: "Aissatou Sylla", vehicle: "Vélo", type: "Livreur", submitted: "Il y a 7h", documents: "Complet" },
  { id: 3, name: "Ibrahima Condé", vehicle: "Moto", type: "Livreur", submitted: "Il y a 2j", documents: "Incomplet" },
];

export default function AdminValidations() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMerchants = pendingMerchants.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.shop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDelivery = pendingDelivery.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDocumentsBadge = (status: string) => {
    if (status === "Complet") {
      return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Complet</Badge>;
    }
    return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">Incomplet</Badge>;
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
            <h1 className="font-heading text-2xl font-bold">Validations en Attente</h1>
          </div>
          <AdminMenu />
        </div>
        <p className="text-white/80">Valider les nouvelles inscriptions</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Rechercher une validation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-2xl p-4 border border-border">
            <Clock className="w-6 h-6 text-orange-600 mb-2" />
            <p className="text-2xl font-heading font-bold">{pendingMerchants.length}</p>
            <p className="text-xs text-muted-foreground">Commerçants en attente</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <Clock className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-2xl font-heading font-bold">{pendingDelivery.length}</p>
            <p className="text-xs text-muted-foreground">Livreurs en attente</p>
          </div>
        </div>

        {/* Tabs for Merchants and Delivery */}
        <Tabs defaultValue="merchants" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="merchants">Commerçants ({pendingMerchants.length})</TabsTrigger>
            <TabsTrigger value="delivery">Livreurs ({pendingDelivery.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="merchants" className="mt-6">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Boutique</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Soumis</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMerchants.map((merchant) => (
                    <TableRow key={merchant.id} className="hover:bg-muted/50">
                      <TableCell>
                        <p className="font-semibold">{merchant.name}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">{merchant.shop}</p>
                      </TableCell>
                      <TableCell>{getDocumentsBadge(merchant.documents)}</TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">{merchant.submitted}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="delivery" className="mt-6">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Véhicule</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Soumis</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDelivery.map((driver) => (
                    <TableRow key={driver.id} className="hover:bg-muted/50">
                      <TableCell>
                        <p className="font-semibold">{driver.name}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">{driver.vehicle}</p>
                      </TableCell>
                      <TableCell>{getDocumentsBadge(driver.documents)}</TableCell>
                      <TableCell>
                        <p className="text-sm text-muted-foreground">{driver.submitted}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
