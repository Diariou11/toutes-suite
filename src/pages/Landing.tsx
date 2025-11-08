import { ShoppingBag, Store, Bike, Shield, Package, Clock, TrendingUp, Users, Globe, Heart, Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { useState, useEffect } from "react";
import { ChatSupport } from "@/components/ChatSupport";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import heroBackground from "@/assets/hero-client-bg.jpg";

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
    image: "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=1600&q=80"
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
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1600&q=80"
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
    image: "https://images.unsplash.com/photo-1593510987459-04a0e2d8ee1c?w=1600&q=80"
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
      
      {/* Menu Hamburger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="fixed top-20 right-6 z-50 rounded-full shadow-lg bg-card hover:bg-accent"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="font-heading text-2xl">Navigation Rapide</SheetTitle>
          </SheetHeader>
          <div className="mt-8 space-y-4">
            {roles.map((role) => (
              <Button
                key={role.title}
                variant="outline"
                className="w-full justify-start gap-4 h-16 text-left hover:bg-primary hover:text-primary-foreground transition-all"
                onClick={() => navigate(role.path)}
              >
                <role.icon className="h-6 w-6" />
                <div>
                  <div className="font-bold">{role.title}</div>
                  <div className="text-xs opacity-80">{role.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      
      <ChatSupport />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section 
          className="relative container mx-auto px-6 py-24 text-center overflow-hidden rounded-3xl mx-6 my-8"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-secondary/80 backdrop-blur-md"></div>
          <div className="relative z-10">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 animate-fade-in text-white">
              TOUTES SUITE
            </h1>
            <p className="text-xl md:text-2xl text-white font-semibold mb-8 typing-animation">
              Vos courses, notre mission
            </p>
            <p className="text-white/90 max-w-2xl mx-auto mb-12 animate-fade-in text-lg" style={{ animationDelay: "0.2s" }}>
              La première super-app 100% guinéenne pour commander, vendre et livrer en toute simplicité
            </p>
          </div>
        </section>

        {/* Ambitions Carousel */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="font-heading text-2xl font-bold text-center mb-12">Nos Ambitions</h2>
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

                <div className="grid grid-cols-2 gap-4 mb-8 overflow-hidden">
                  {role.benefits.map((benefit, bIdx) => (
                    <div
                      key={bIdx}
                      className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border animate-fade-in hover:scale-105 transition-transform"
                      style={{ 
                        animationDelay: `${bIdx * 0.1}s`,
                        animation: `fade-in 0.5s ease-out ${bIdx * 0.1}s, float 3s ease-in-out ${bIdx * 0.5}s infinite`
                      }}
                    >
                      <p className="text-sm font-medium text-center text-white">{benefit}</p>
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
        <section className="bg-gradient-to-br from-primary/5 via-muted to-secondary/5 py-24">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm rounded-3xl p-12 border border-border shadow-lg">
              <Shield className="w-20 h-20 text-primary mx-auto mb-6 animate-pulse" />
              <h3 className="font-heading text-3xl font-bold mb-4">
                Êtes-vous un Admin Désigné ?
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Accédez au panneau d'administration pour gérer la plateforme
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/auth/admin")}
                className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all hover:scale-105"
              >
                Connexion Admin
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-secondary text-primary-foreground py-12">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground text-secondary hover:bg-primary-foreground/90 border-2 border-primary-foreground"
                onClick={() => navigate('/install')}
              >
                <Download className="mr-2 h-5 w-5" />
                Installer l'application
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="text-center md:text-left">
                <h4 className="font-heading font-bold mb-3">TOUTES SUITE</h4>
                <p className="text-sm text-primary-foreground/80">
                  La super-app 100% guinéenne
                </p>
              </div>
              
              <div className="text-center md:text-left">
                <h4 className="font-heading font-bold mb-3">Liens</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/faq" className="hover:underline">FAQ</a></li>
                  <li><a href="#" className="hover:underline">À propos</a></li>
                </ul>
              </div>
              
              <div className="text-center md:text-left">
                <h4 className="font-heading font-bold mb-3">Contact</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">+224 XXX XX XX XX</a></li>
                  <li><a href="#" className="hover:underline">contact@toutessuite.gn</a></li>
                </ul>
              </div>
              
              <div className="text-center md:text-left">
                <h4 className="font-heading font-bold mb-3">Réseaux</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">Facebook</a></li>
                  <li><a href="#" className="hover:underline">Instagram</a></li>
                  <li><a href="#" className="hover:underline">WhatsApp</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm">
              <p>&copy; 2025 TOUTES SUITE - Made in Guinea 🇬🇳</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
