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
    const { text, action, language = 'fr' } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = `Tu es l'assistant vocal de TOUTES SUITE pour les commerçants guinéens.

MISSION: Comprendre les commandes vocales et retourner des actions structurées.

ACTIONS DISPONIBLES:
- voir_commandes: Afficher les commandes
- voir_produits: Afficher les produits
- ajouter_produit: Ajouter un nouveau produit
- modifier_stock: Modifier le stock
- voir_statistiques: Voir les statistiques de vente
- aide: Demander de l'aide

LANGUES SUPPORTÉES:
- Français (fr)
- Soussou (sus)
- Peul (ful)
- Malinké (man)

Retourne UNIQUEMENT l'action détectée avec les paramètres extraits.`;

    if (language !== 'fr') {
      systemPrompt += `\n\nATTENTION: L'utilisateur parle en ${language}. Traduis d'abord puis détecte l'action.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "detect_action",
              description: "Détecte l'action vocale du commerçant",
              parameters: {
                type: "object",
                properties: {
                  action: { 
                    type: "string", 
                    enum: ["voir_commandes", "voir_produits", "ajouter_produit", "modifier_stock", "voir_statistiques", "aide"],
                    description: "Action détectée" 
                  },
                  parameters: { 
                    type: "object",
                    description: "Paramètres extraits de la commande vocale"
                  },
                  translatedText: {
                    type: "string",
                    description: "Traduction en français si nécessaire"
                  }
                },
                required: ["action"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "detect_action" } }
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
      const result = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ action: "aide", parameters: {} }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("voice-assistant error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
