import { ArrowLeft, AlertCircle, MessageSquare, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AdminMenu from "@/components/AdminMenu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const disputes = [
  {
    id: 1,
    orderId: "#CMD-2847",
    client: "Salifou Bayo",
    merchant: "Pharmacie Centrale",
    reason: "Produit non conforme",
    date: "2024-01-15",
    status: "pending",
    amount: "45,000 GNF",
    description: "Le client signale que le médicament reçu ne correspond pas à sa commande initiale."
  },
  {
    id: 2,
    orderId: "#CMD-2901",
    client: "Mariama Diallo",
    merchant: "Boucherie du Marché",
    reason: "Livraison incomplète",
    date: "2024-01-16",
    status: "pending",
    amount: "78,000 GNF",
    description: "Article manquant dans la livraison. Le client a commandé 3kg de viande mais n'a reçu que 2kg."
  },
  {
    id: 3,
    orderId: "#CMD-2764",
    client: "Amadou Bah",
    merchant: "Électronique Plus",
    reason: "Produit défectueux",
    date: "2024-01-14",
    status: "pending",
    amount: "125,000 GNF",
    description: "Le téléphone livré présente un défaut de fabrication et ne s'allume pas."
  },
  {
    id: 4,
    orderId: "#CMD-2523",
    client: "Fatou Sow",
    merchant: "Mode & Style",
    reason: "Livraison en retard",
    date: "2024-01-12",
    status: "resolved",
    amount: "32,000 GNF",
    description: "Livraison effectuée avec 2 jours de retard. Litige résolu avec compensation client."
  },
];

export default function AdminDisputes() {
  const navigate = useNavigate();

  const pendingDisputes = disputes.filter(d => d.status === "pending");
  const resolvedDisputes = disputes.filter(d => d.status === "resolved");

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
            <h1 className="font-heading text-2xl font-bold">Gestion des Litiges</h1>
          </div>
          <AdminMenu />
        </div>
        <p className="text-white/80">Résolution des conflits et réclamations</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-2xl p-4 border border-border">
            <AlertCircle className="w-6 h-6 text-orange-600 mb-2" />
            <p className="text-2xl font-heading font-bold">{pendingDisputes.length}</p>
            <p className="text-xs text-muted-foreground">En cours</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-2xl font-heading font-bold">{resolvedDisputes.length}</p>
            <p className="text-xs text-muted-foreground">Résolus</p>
          </div>
        </div>

        {/* Pending Disputes */}
        <div className="space-y-3">
          <h2 className="font-heading text-lg font-bold">Litiges en attente</h2>
          {pendingDisputes.map((dispute) => (
            <Card key={dispute.id} className="border-orange-500/20 bg-orange-500/5">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-lg">{dispute.orderId}</p>
                    <p className="text-sm text-muted-foreground">{dispute.date}</p>
                  </div>
                  <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">
                    En cours
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Raison: {dispute.reason}</p>
                  <p className="text-sm text-muted-foreground">Client: {dispute.client}</p>
                  <p className="text-sm text-muted-foreground">Commerçant: {dispute.merchant}</p>
                  <p className="text-sm text-muted-foreground">Montant: {dispute.amount}</p>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <p className="text-sm">{dispute.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 h-10">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contacter les parties
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-10 w-10 text-red-600">
                    <XCircle className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resolved Disputes */}
        {resolvedDisputes.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-heading text-lg font-bold">Litiges résolus récents</h2>
            {resolvedDisputes.map((dispute) => (
              <Card key={dispute.id} className="border-green-500/20 bg-green-500/5">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{dispute.orderId}</p>
                      <p className="text-sm text-muted-foreground">{dispute.date}</p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                      Résolu
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{dispute.reason} • {dispute.amount}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
