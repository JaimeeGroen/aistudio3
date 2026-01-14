import { GoogleGenAI, Type } from "@google/genai";
import { MarketData, AIAnalysisResult } from "../types";

// Note: In a real production app, you would never expose the key on the client.
// This is for demonstration purposes within the requested environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMarketPrices = async (data: MarketData): Promise<AIAnalysisResult> => {
  const prompt = `
    You are an expert e-commerce pricing analyst. 
    Analyze the following pricing data for the padel racket "${data.productName}".
    
    Data Context:
    ${JSON.stringify(data.competitors.map(c => ({
      store: c.name,
      currentPrice: c.currentPrice,
      lowestPriceLast30Days: Math.min(...c.history.map(h => h.price)),
      highestPriceLast30Days: Math.max(...c.history.map(h => h.price))
    })))}

    Tasks:
    1. Determine if the user should BUY now or WAIT based on the lowest current price versus historical lows.
    2. Write a short, punchy summary of the market situation (max 2 sentences).
    3. Identify the absolute best deal (Store Name + Price).

    Return ONLY JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                recommendation: { type: Type.STRING, enum: ['BUY', 'WAIT', 'NEUTRAL'] },
                summary: { type: Type.STRING },
                bestDeal: { type: Type.STRING }
            },
            required: ['recommendation', 'summary', 'bestDeal']
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response from AI");
    
    return JSON.parse(resultText) as AIAnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      recommendation: 'NEUTRAL',
      summary: "AI Analysis unavailable currently. Please check the graph manually.",
      bestDeal: "Check list below"
    };
  }
};