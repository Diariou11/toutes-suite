import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'fr-GN';

      recognitionInstance.onresult = async (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        await processVoiceCommand(text);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Erreur",
          description: "Impossible de capturer la voix. Réessayez.",
          variant: "destructive",
        });
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      toast({
        title: "Non supporté",
        description: "La reconnaissance vocale n'est pas disponible sur ce navigateur.",
        variant: "destructive",
      });
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setTranscript("");
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const processVoiceCommand = async (text: string) => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("voice-assistant", {
        body: { text, language: 'fr' },
      });

      if (error) throw error;

      const { action, parameters } = data;

      // Execute action
      switch (action) {
        case "voir_commandes":
          navigate("/merchant/orders");
          speak("Voici vos commandes");
          break;
        case "voir_produits":
          navigate("/merchant/products");
          speak("Voici vos produits");
          break;
        case "voir_statistiques":
          navigate("/merchant");
          speak("Voici vos statistiques");
          break;
        case "aide":
          speak("Je peux vous aider à voir vos commandes, produits, ou statistiques. Que souhaitez-vous faire ?");
          break;
        default:
          speak("Je n'ai pas compris. Répétez s'il vous plaît.");
      }

      toast({
        title: "Commande exécutée",
        description: `Action: ${action}`,
      });
    } catch (error) {
      console.error("Voice assistant error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de traiter la commande vocale.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
      <div className="flex items-center gap-4">
        <Button
          onClick={isListening ? stopListening : startListening}
          disabled={isProcessing}
          className={`h-16 w-16 rounded-full ${
            isListening ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
          }`}
        >
          {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Volume2 className="h-4 w-4 text-primary" />
            <h3 className="font-heading font-semibold">Assistant Vocal</h3>
          </div>
          {transcript ? (
            <p className="text-sm text-muted-foreground">"{transcript}"</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              {isListening ? "Parlez maintenant..." : "Appuyez pour parler"}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
