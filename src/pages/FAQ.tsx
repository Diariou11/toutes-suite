import { ChevronDown, ShoppingBag, Store, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/Header";

const faqSections = [
  {
    icon: ShoppingBag,
    title: "Questions Client",
    color: "text-primary",
    questions: [
      {
        q: "Comment passer une commande ?",
        a: "Sélectionnez vos produits dans le catalogue, ajoutez-les au panier, puis validez votre commande. Vous pouvez suivre la livraison en temps réel."
      },
      {
        q: "Quels sont les délais de livraison ?",
        a: "Nous garantissons une livraison en moins de 30 minutes dans les zones couvertes de Conakry."
      },
      {
        q: "Quels modes de paiement sont acceptés ?",
        a: "Nous acceptons le paiement en espèces à la livraison, Orange Money, MTN Mobile Money et les cartes bancaires."
      },
      {
        q: "Comment annuler une commande ?",
        a: "Vous pouvez annuler votre commande dans les 2 premières minutes après validation via la section 'Mes Commandes'."
      },
      {
        q: "Que faire si un produit manque ?",
        a: "Contactez immédiatement le support via l'application. Nous vous rembourserons ou remplacerons le produit manquant."
      }
    ]
  },
  {
    icon: Store,
    title: "Questions Commerçant",
    color: "text-secondary",
    questions: [
      {
        q: "Comment créer ma boutique ?",
        a: "Inscrivez-vous en tant que commerçant, remplissez les informations de votre boutique et commencez à ajouter vos produits avec photos et prix."
      },
      {
        q: "Y a-t-il des frais d'inscription ?",
        a: "Non, l'inscription est 100% gratuite. Nous prenons uniquement une petite commission sur chaque vente réalisée."
      },
      {
        q: "Quand suis-je payé ?",
        a: "Les paiements sont effectués automatiquement chaque semaine sur votre compte mobile money ou bancaire."
      },
      {
        q: "Comment gérer mes stocks ?",
        a: "Utilisez le tableau de bord commerçant pour ajouter, modifier ou désactiver vos produits en temps réel."
      },
      {
        q: "Puis-je refuser une commande ?",
        a: "Oui, vous avez 5 minutes pour accepter ou refuser une commande. Attention, un taux de refus élevé peut affecter votre visibilité."
      }
    ]
  },
  {
    icon: Bike,
    title: "Questions Livreur",
    color: "text-green-500",
    questions: [
      {
        q: "Comment devenir livreur ?",
        a: "Inscrivez-vous avec vos documents (CNI, permis de conduire, photo de votre moto). Notre équipe validera votre compte sous 24h."
      },
      {
        q: "Combien puis-je gagner ?",
        a: "Les revenus varient selon votre activité. En moyenne, nos livreurs gagnent entre 3000 et 8000 GNF par course, avec des bonus performance."
      },
      {
        q: "Quand suis-je payé ?",
        a: "Vous pouvez retirer vos gains à tout moment une fois le seuil minimum de 50 000 GNF atteint."
      },
      {
        q: "Comment choisir mes missions ?",
        a: "L'application vous propose des missions selon votre position. Vous êtes libre d'accepter ou refuser chaque mission."
      },
      {
        q: "L'assurance est-elle incluse ?",
        a: "Oui, tous nos livreurs sont assurés pendant leurs missions via notre partenariat avec NSIA Assurance."
      }
    ]
  }
];

export default function FAQ() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted via-background to-muted">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Questions Fréquentes
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions selon votre profil
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {faqSections.map((section, idx) => (
              <div 
                key={section.title}
                className="bg-card rounded-3xl p-8 border border-border shadow-sm animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                    <section.icon className={`w-8 h-8 ${section.color}`} />
                  </div>
                  <h2 className="font-heading text-2xl font-bold">{section.title}</h2>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {section.questions.map((item, qIdx) => (
                    <AccordionItem 
                      key={qIdx} 
                      value={`${idx}-${qIdx}`}
                      className="border border-border rounded-xl px-4 bg-background/50"
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <span className="text-left font-medium">{item.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <Button onClick={() => navigate("/")}>
              Contactez notre support
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
