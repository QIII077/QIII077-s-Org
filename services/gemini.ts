
/**
 * AI 服务已暂时停用。
 * 应用目前仅支持手动录入与预设食物查询。
 */
export const getSmartAdvice = async (...args: any[]) => "保持乐观心态，享受健康生活。";
export const analyzeFoodImage = async (...args: any[]) => null;
export const searchFoodCalories = async (...args: any[]) => null;
export const editImageWithAI = async (...args: any[]) => null;
export const createAIAssistantChat = () => ({ sendMessage: async () => ({ text: "AI 模块暂未启用。" }) });
