import { ArrowLeft, TrendingUp, DollarSign, ShoppingBag, Users, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AdminMenu from "@/components/AdminMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const revenueData = [
  { month: "Jan", revenue: 2400000, orders: 345 },
  { month: "Fév", revenue: 2800000, orders: 412 },
  { month: "Mar", revenue: 3200000, orders: 489 },
  { month: "Avr", revenue: 3600000, orders: 523 },
  { month: "Mai", revenue: 4100000, orders: 598 },
  { month: "Juin", revenue: 4500000, orders: 645 },
];

const topMerchants = [
  { name: "Pharmacie Centrale", revenue: "4.2M GNF", orders: 523, growth: "+23%" },
  { name: "Électronique Plus", revenue: "3.8M GNF", orders: 456, growth: "+18%" },
  { name: "Boucherie du Marché", revenue: "3.2M GNF", orders: 398, growth: "+15%" },
  { name: "Fruits & Légumes Bio", revenue: "2.9M GNF", orders: 367, growth: "+12%" },
];

const topDeliveryDrivers = [
  { name: "Ousmane Bah", deliveries: 298, earnings: "1.5M GNF", rating: 4.9 },
  { name: "Jean Haba", deliveries: 234, earnings: "1.2M GNF", rating: 4.9 },
  { name: "Mamadou Camara", deliveries: 189, earnings: "980K GNF", rating: 4.7 },
  { name: "Alsény Sylla", deliveries: 156, earnings: "820K GNF", rating: 4.8 },
];

export default function AdminReporting() {
  const navigate = useNavigate();

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
            <h1 className="font-heading text-2xl font-bold">Rapports & Statistiques</h1>
          </div>
          <AdminMenu />
        </div>
        <p className="text-white/80">Analyse détaillée de la plateforme</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Revenus totaux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20.6M GNF</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +18.2% ce mois
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-primary" />
                Commandes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,845</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12.5% ce mois
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Download Button */}
        <Button className="w-full h-12">
          <Download className="w-5 h-5 mr-2" />
          Télécharger le rapport complet (PDF)
        </Button>

        {/* Tabs */}
        <Tabs defaultValue="merchants" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="merchants">Top Commerçants</TabsTrigger>
            <TabsTrigger value="drivers">Top Livreurs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="merchants" className="space-y-4 mt-4">
            {topMerchants.map((merchant, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{merchant.name}</p>
                    <p className="text-sm text-muted-foreground">{merchant.orders} commandes</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{merchant.revenue}</p>
                  <p className="text-xs text-green-600">{merchant.growth}</p>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="drivers" className="space-y-4 mt-4">
            {topDeliveryDrivers.map((driver, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{driver.name}</p>
                    <p className="text-sm text-muted-foreground">{driver.deliveries} livraisons • {driver.rating}⭐</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{driver.earnings}</p>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance mensuelle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {revenueData.map((data) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm font-medium">{data.month}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{data.orders} cmd</span>
                  <span className="text-sm font-semibold">{(data.revenue / 1000000).toFixed(1)}M GNF</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
