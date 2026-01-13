
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, FoodRecord } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartAdvice = async (profile: UserProfile, todayIntake: number, dailyGoal: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `用户信息：年龄 ${profile.age}, 体重 ${profile.weight}kg, 身高 ${profile.height}cm, 目标: ${profile.goal}。
      今日已摄入：${todayIntake} kcal。每日目标：${dailyGoal} kcal。
      请提供一条简短、温馨且专业的建议。要求：50字以内，语气像贴心的女性挚友。`,
      config: {
        systemInstruction: "你是一位专为现代职业女性服务的资深营养师。语气亲切、科学但不刻板。你的任务是引导用户建立健康的饮食观，消除卡路里焦虑。",
        temperature: 0.7,
      },
    });
    return response.text || "记得多喝水，保持心情愉悦。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "记得多喝水，保持心情愉悦。每一份努力都在让身体变更好！";
  }
};

export const analyzeFoodImage = async (base64Data: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
          { text: "Identify the food in this image and estimate its calories in a typical portion size. Return JSON with 'name' and 'calories' (number)." }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            calories: { type: Type.NUMBER }
          },
          required: ["name", "calories"]
        }
      }
    });
    const text = response.text;
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Vision Error:", error);
    return null;
  }
};

export const searchFoodCalories = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Search for the average calorie content of: ${query}. Return the result in a JSON format with 'name', 'calories' (number per serving), and 'unit'.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            calories: { type: Type.NUMBER },
            unit: { type: Type.STRING }
          },
          required: ["name", "calories", "unit"]
        }
      },
    });
    const text = response.text;
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Search Error:", error);
    return null;
  }
};

/**
 * Image Editing with Gemini 2.5 Flash Image
 */
export const editImageWithAI = async (base64ImageData: string, prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Edit Error:", error);
    return null;
  }
};

/**
 * Chat with Gemini 3 Pro Preview - Refined Persona
 */
export const createAIAssistantChat = () => {
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "你是‘轻享小助’。身份：专业营养师与现代女性生活导师。语气：亲切、极简、富有同理心。规则：1.回复必须控制在100字以内。2.优先使用短句、列表或Emoji。3.严禁使用生涩医学术语。4.关注心理健康与身体自爱，不单纯强调减重。5.如果用户询问饮食，给出具体且可操作的建议。",
    },
  });
};
