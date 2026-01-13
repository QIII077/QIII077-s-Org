
export enum MealType {
  BREAKFAST = '早餐',
  LUNCH = '午餐',
  DINNER = '晚餐',
  SNACK = '零食'
}

export enum ActivityLevel {
  SEDENTARY = '久坐',
  LIGHT = '轻度活动',
  MODERATE = '中度活动',
  ACTIVE = '高度活动'
}

export enum GoalType {
  MAINTAIN = '维持体重',
  LOSE = '减重',
  GAIN = '增重'
}

export interface UserProfile {
  height: number;
  weight: number;
  age: number;
  gender: 'female' | 'male';
  activityLevel: ActivityLevel;
  goal: GoalType;
  targetWeight?: number;
}

export interface FoodRecord {
  id: string;
  name: string;
  calories: number;
  mealType: MealType;
  timestamp: number;
  quantity: string;
}

export interface DailySummary {
  date: string;
  intake: number;
  bmr: number;
  activityBurn: number;
  tdee: number;
  target: number;
}
