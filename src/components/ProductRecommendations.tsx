import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Recommendation {
  name: string;
  category: string;
  price: string;
  reason: string;
}

interface ProductRecommendationsProps {
  currentCategory?: string;
  browsedCategories?: string[];
}

export function ProductRecommendations({ currentCategory, browsedCategories }: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchRecommendations();
  }, [currentCategory]);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("product-recommendations", {
        body: {
          currentCategory,
          browsedCategories: browsedCategories || [],
        },
      });

      if (error) throw error;

      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error("Recommendations error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les recommandations.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <p className="text-sm font-medium">Chargement des recommandations...</p>
        </div>
      </Card>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-heading font-bold">Recommandé pour vous</h3>
      </div>
      <div className="grid gap-3">
        {recommendations.map((rec, idx) => (
          <Card key={idx} className="p-3 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{rec.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{rec.reason}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded">
                    {rec.category}
                  </span>
                  <span className="text-sm font-bold text-primary">{rec.price}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
