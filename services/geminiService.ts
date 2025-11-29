import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProjectInquiry = async (
  details: string,
  serviceContext: string
): Promise<AIAnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  // Updated to use the thinking model as requested for deeper analysis
  const modelId = "gemini-3-pro-preview";
  
  const prompt = `
    You are an AI assistant for a freelancer named Armageddon Vivas who specializes in SEO Optimization and Workflow Automation.
    Analyze the following project inquiry from a potential client.
    
    Client's rough details: "${details}"
    Client's selected service interest: "${serviceContext}"

    Your goal is to structure this into a professional inquiry, suggest relevant specific services based on their problem, and estimate complexity (Low, Medium, High).
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 32768,
        },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            refinedSubject: {
              type: Type.STRING,
              description: "A professional email subject line summarizing the project.",
            },
            enhancedMessage: {
              type: Type.STRING,
              description: "A polished, professional version of the client's message, expanding on their needs clearly.",
            },
            suggestedServices: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 specific sub-services (e.g., 'Keyword Research', 'Zapier Integration') relevant to the request.",
            },
            estimatedComplexity: {
              type: Type.STRING,
              description: "Estimated project complexity: Low, Medium, or High.",
            }
          },
          required: ["refinedSubject", "enhancedMessage", "suggestedServices", "estimatedComplexity"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AIAnalysisResult;
    }
    
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    // Fallback if AI fails
    return {
      refinedSubject: `Project Inquiry: ${serviceContext}`,
      enhancedMessage: details,
      suggestedServices: ["Consultation"],
      estimatedComplexity: "Unknown"
    };
  }
};

export const editImageWithGemini = async (
  imageBase64DataUrl: string,
  prompt: string,
  mimeType: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  // Extract base64 data from Data URL
  const base64Data = imageBase64DataUrl.split(',')[1];
  if (!base64Data) {
    throw new Error("Invalid image data");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image generated");
  } catch (error) {
    console.error("Gemini image editing failed:", error);
    throw error;
  }
};

export const generateChatResponse = async (
  history: ChatMessage[],
  userMessage: string
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const modelId = "gemini-3-pro-preview";

  const systemInstruction = `
    You are the AI Assistant for Armageddon Vivas, a freelance SEO & Automation Specialist.
    Your goal is to help potential clients understand Armageddon's services, estimate pricing, and book a discovery call.

    Armageddon's Core Services:
    1. SEO Optimization (Technical SEO, On-page, Local SEO).
    2. Workflow Automation (n8n, Zapier, Make.com, GoHighLevel).
    3. CRM Integrations & Lead Nurturing.

    Pricing Guidelines (Provide these as ROUGH ESTIMATES only):
    - Basic Automation (e.g., Simple Zapier/Make workflow): $200 - $500 per workflow.
    - Complex Integration (e.g., API connectors, custom scripts, multi-step logic, CRM sync): $500 - $1,500+.
    - SEO Audit & Strategy (One-time): $800 - $1,500.
    - Monthly Retainer (SEO + Ongoing Automation Support): Starts at $1,500/month.
    
    Rules:
    - Always state that these are estimates. The final price depends on specific scope and complexity.
    - Encourage them to "Book a Discovery Call" for a firm quote.
    - Be professional, concise, and helpful. 
    - If you don't know the answer, ask them to contact Armageddon directly at armageddonvivas@gmail.com.
  `;

  // Construct a prompt with history
  const conversationHistory = history
    .map(msg => `${msg.role === 'user' ? 'Client' : 'Assistant'}: ${msg.text}`)
    .join('\n');
    
  const prompt = `
    ${systemInstruction}

    Current Conversation History:
    ${conversationHistory}
    
    Client: ${userMessage}
    Assistant:
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        // Using a moderate thinking budget for chat to balance reasoning vs latency
        thinkingConfig: {
            thinkingBudget: 2048, 
        }
      }
    });

    return response.text || "I'm having trouble thinking of a response right now. Please try again.";
  } catch (error) {
    console.error("Chat generation failed:", error);
    return "I'm currently unable to connect to the server. Please feel free to email Armageddon directly.";
  }
};
