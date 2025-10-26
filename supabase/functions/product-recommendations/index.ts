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
    const { userPreferences, browsedCategories, currentCategory } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = `Contexte: Tu analyses les préférences d'un utilisateur de TOUTES SUITE en Guinée.

DONNÉES UTILISATEUR:
${userPreferences ? `Préférences: ${JSON.stringify(userPreferences)}` : ''}
${browsedCategories ? `Catégories consultées: ${browsedCategories.join(', ')}` : ''}
${currentCategory ? `Catégorie actuelle: ${currentCategory}` : ''}

CATÉGORIES DISPONIBLES:
- Épicerie (250+ produits)
- Fruits & Légumes (80+ produits)
- Pharmacie (120+ produits)
- Maison (200+ produits)
- Électronique (150+ produits)
- Mode (300+ produits)

MISSION: Recommande 3-4 produits pertinents pour cet utilisateur. Adapte tes suggestions au contexte guinéen (produits locaux, prix en GNF, habitudes d'achat).`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "user", content: prompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "suggest_products",
              description: "Retourne 3-4 recommandations de produits personnalisées",
              parameters: {
                type: "object",
                properties: {
                  recommendations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string", description: "Nom du produit" },
                        category: { type: "string", description: "Catégorie du produit" },
                        price: { type: "string", description: "Prix en GNF" },
                        reason: { type: "string", description: "Pourquoi ce produit est recommandé" }
                      },
                      required: ["name", "category", "price", "reason"],
                      additionalProperties: false
                    }
                  }
                },
                required: ["recommendations"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "suggest_products" } }
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
      const recommendations = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(recommendations), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ recommendations: [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("product-recommendations error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
