import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

export default function AuthPage() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const roleConfig = {
    client: { title: "Client", redirect: "/client/home" },
    merchant: { title: "Commerçant", redirect: "/merchant/dashboard" },
    delivery: { title: "Livreur", redirect: "/delivery/missions" },
    admin: { title: "Admin", redirect: "/admin/dashboard" },
  }[role || "client"];

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 9) {
      toast.error("Numéro de téléphone invalide");
      return;
    }
    toast.success("Code OTP envoyé !");
    setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Code OTP invalide");
      return;
    }
    toast.success("Connexion réussie !");
    setTimeout(() => navigate(roleConfig.redirect), 500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <button
        onClick={() => step === "otp" ? setStep("phone") : navigate("/")}
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Retour</span>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <img src={logo} alt="TOUTES SUITE" className="h-24 mb-8" />
        
        <h1 className="font-heading text-2xl font-bold text-center mb-2">
          Connexion {roleConfig.title}
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          {step === "phone" 
            ? "Entrez votre numéro de téléphone" 
            : "Entrez le code OTP reçu par SMS"
          }
        </p>

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Numéro de téléphone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="620 00 00 00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-11 h-12 text-base"
                  maxLength={12}
                />
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full h-12">
              Continuer
            </Button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Code OTP</label>
              <Input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="h-12 text-center text-2xl font-bold tracking-widest"
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground text-center">
                Code envoyé au {phone}
              </p>
            </div>

            <Button type="submit" className="w-full h-12">
              Valider
            </Button>

            <button
              type="button"
              onClick={() => toast.success("Code OTP renvoyé !")}
              className="w-full text-sm text-primary font-medium hover:underline"
            >
              Renvoyer le code
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
