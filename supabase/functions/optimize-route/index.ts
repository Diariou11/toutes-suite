import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { missions, currentLocation } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = `Tu es un expert en optimisation de routes de livraison à Conakry, Guinée.

CONTEXTE CONAKRY:
- Trafic dense aux heures de pointe (7h-9h, 17h-19h)
- Routes principales: Autoroute Fidel Castro, Route du Niger, Corniche
- Quartiers: Kaloum, Matam, Ratoma, Dixinn, Matoto
- Contraintes: Embouteillages fréquents, routes non goudronnées

POSITION ACTUELLE:
${currentLocation ? JSON.stringify(currentLocation) : "Non définie"}

MISSIONS DISPONIBLES:
${JSON.stringify(missions, null, 2)}

OBJECTIF: Optimise l'ordre des livraisons pour:
1. Minimiser la distance totale
2. Éviter les embouteillages
3. Regrouper les livraisons proches
4. Maximiser les gains du livreur

Retourne un itinéraire optimisé avec temps estimé et gains.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "user", content: prompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "optimize_delivery_route",
              description: "Retourne un itinéraire de livraison optimisé",
              parameters: {
                type: "object",
                properties: {
                  optimizedMissions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        missionId: { type: "string" },
                        order: { type: "number", description: "Ordre de livraison (1, 2, 3...)" },
                        estimatedTime: { type: "string", description: "Temps estimé (ex: '15 min')" },
                        distance: { type: "string", description: "Distance (ex: '3.5 km')" }
                      },
                      required: ["missionId", "order", "estimatedTime", "distance"]
                    }
                  },
                  totalTime: { type: "string", description: "Temps total estimé" },
                  totalDistance: { type: "string", description: "Distance totale" },
                  totalEarnings: { type: "string", description: "Gains totaux estimés en GNF" },
                  recommendations: {
                    type: "array",
                    items: { type: "string" },
                    description: "Conseils pour optimiser la tournée"
                  }
                },
                required: ["optimizedMissions", "totalTime", "totalDistance", "totalEarnings"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "optimize_delivery_route" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédit insuffisant" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices[0]?.message?.tool_calls?.[0];
    
    if (toolCall) {
      const optimizedRoute = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(optimizedRoute), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ optimizedMissions: [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("optimize-route error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
