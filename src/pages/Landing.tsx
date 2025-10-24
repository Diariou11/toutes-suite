import { ShoppingBag, Store, Bike, Shield, Package, Clock, TrendingUp, Users, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { useState, useEffect } from "react";

const roles = [
  {
    icon: ShoppingBag,
    title: "Client",
    description: "Commandez vos produits préférés",
    benefits: [
      "Livraison rapide en 30min",
      "Large choix de produits",
      "Paiement sécurisé",
      "Suivi en temps réel"
    ],
    path: "/auth/client",
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80"
  },
  {
    icon: Store,
    title: "Commerçant",
    description: "Vendez et gérez votre boutique",
    benefits: [
      "Zéro frais d'inscription",
      "Dashboard simplifié",
      "Paiements instantanés",
      "Support dédié 24/7"
    ],
    path: "/auth/merchant",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80"
  },
  {
    icon: Bike,
    title: "Livreur",
    description: "Gagnez de l'argent en livrant",
    benefits: [
      "Horaires flexibles",
      "Revenus attractifs",
      "Bonus performance",
      "Assurance incluse"
    ],
    path: "/auth/delivery",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80"
  },
];

const ambitions = [
  { icon: TrendingUp, text: "Première super-app guinéenne" },
  { icon: Users, text: "Connecter 1M d'utilisateurs" },
  { icon: Clock, text: "Livraison en moins de 30min" },
  { icon: Package, text: "10 000+ produits disponibles" },
  { icon: Globe, text: "Couverture nationale" },
  { icon: Heart, text: "100% Made in Guinea" },
];

export default function Landing() {
  const navigate = useNavigate();
  const [currentAmbition, setCurrentAmbition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAmbition((prev) => (prev + 1) % ambitions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted via-background to-muted">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TOUTES SUITE
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-secondary font-semibold mb-8 animate-slide-up">
            Vos courses, notre mission
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            La première super-app 100% guinéenne pour commander, vendre et livrer en toute simplicité
          </p>
        </section>

        {/* Ambitions Carousel */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="font-heading text-2xl font-bold text-center mb-8">Nos Ambitions</h2>
          <div className="relative h-24 overflow-hidden">
            {ambitions.map((ambition, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 flex items-center justify-center gap-4 transition-all duration-1000 ${
                  idx === currentAmbition
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <ambition.icon className="w-12 h-12 text-primary animate-pulse" />
                <p className="text-lg font-heading font-semibold">{ambition.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Role Sections */}
        {roles.map((role, idx) => (
          <section
            key={role.title}
            className="relative min-h-screen flex items-center overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${role.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed"
            }}
          >
            <div className="container mx-auto px-6 py-20">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                    <role.icon className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-heading text-4xl font-bold text-white mb-2 typing-animation">
                      {role.title}
                    </h2>
                    <p className="text-white/80 text-lg">{role.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {role.benefits.map((benefit, bIdx) => (
                    <div
                      key={bIdx}
                      className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border animate-fade-in"
                      style={{ animationDelay: `${bIdx * 0.1}s` }}
                    >
                      <p className="text-sm font-medium text-center">{benefit}</p>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="w-full md:w-auto bg-gradient-to-r from-secondary to-primary text-white font-bold hover:opacity-90 transition-all hover:scale-105"
                  onClick={() => navigate(role.path)}
                >
                  Commencer en tant que {role.title}
                </Button>
              </div>
            </div>
          </section>
        ))}

        {/* Admin Section */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-6 text-center">
            <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="font-heading text-2xl font-bold mb-4">
              Êtes-vous un Admin Désigné ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Accédez au panneau d'administration pour gérer la plateforme
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/auth/admin")}
            >
              Connexion Admin
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="font-heading font-bold mb-4">TOUTES SUITE</h4>
                <p className="text-sm text-primary-foreground/80">
                  Vos courses, notre mission
                </p>
              </div>
              <div>
                <h4 className="font-heading font-bold mb-4">Liens rapides</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">À propos</a></li>
                  <li><a href="#" className="hover:underline">Contact</a></li>
                  <li><a href="#" className="hover:underline">Conditions</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-heading font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">FAQ</a></li>
                  <li><a href="#" className="hover:underline">Aide</a></li>
                  <li><a href="#" className="hover:underline">+224 XXX XX XX XX</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm">
              <p>&copy; 2025 TOUTES SUITE - Une super-app 100% guinéenne</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
