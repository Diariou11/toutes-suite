import { Smartphone, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InstallPWA() {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for the beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-secondary/10 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-card rounded-3xl shadow-xl p-8 border border-border">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center">
            <Smartphone className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>

        <h1 className="font-heading text-3xl font-bold text-center mb-4">
          Installez TOUTES SUITE
        </h1>

        {isInstalled ? (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <p className="text-muted-foreground">
              L'application est déjà installée sur votre appareil !
            </p>
            <Button 
              variant="default" 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/')}
            >
              Retour à l'accueil
            </Button>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground text-center mb-8">
              Installez notre application pour une expérience optimale et un accès rapide depuis votre écran d'accueil.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Accès rapide</h3>
                  <p className="text-sm text-muted-foreground">
                    Lancez l'app directement depuis votre écran d'accueil
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Mode hors ligne</h3>
                  <p className="text-sm text-muted-foreground">
                    Consultez vos commandes même sans connexion
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Performances optimales</h3>
                  <p className="text-sm text-muted-foreground">
                    Chargement ultra-rapide et navigation fluide
                  </p>
                </div>
              </div>
            </div>

            {deferredPrompt ? (
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleInstall}
              >
                <Download className="w-5 h-5 mr-2" />
                Installer l'application
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-xl p-4 text-sm">
                  <p className="font-semibold mb-2">Comment installer :</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>iPhone/iPad :</strong> Appuyez sur <span className="inline-flex items-center">⎙</span> puis "Sur l'écran d'accueil"</li>
                    <li>• <strong>Android :</strong> Ouvrez le menu du navigateur puis "Installer l'application"</li>
                  </ul>
                </div>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => navigate('/')}
                >
                  Continuer dans le navigateur
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
