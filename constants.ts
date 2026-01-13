
import { ActivityLevel, GoalType, UserProfile, MealType } from './types';

export const DEFAULT_PROFILE: UserProfile = {
  height: 165,
  weight: 55,
  age: 26,
  gender: 'female',
  activityLevel: ActivityLevel.LIGHT,
  goal: GoalType.MAINTAIN,
};

export const ACTIVITY_MULTIPLIERS = {
  [ActivityLevel.SEDENTARY]: 1.2,
  [ActivityLevel.LIGHT]: 1.375,
  [ActivityLevel.MODERATE]: 1.55,
  [ActivityLevel.ACTIVE]: 1.725,
};

export const QUICK_FOODS = [
  { name: '拿铁咖啡', calories: 120, unit: '杯', type: MealType.SNACK },
  { name: '美式咖啡', calories: 5, unit: '杯', type: MealType.SNACK },
  { name: '珍珠奶茶', calories: 450, unit: '杯', type: MealType.SNACK },
  { name: '鸡胸肉沙拉', calories: 320, unit: '份', type: MealType.LUNCH },
  { name: '三明治', calories: 280, unit: '个', type: MealType.BREAKFAST },
  { name: '坚果', calories: 160, unit: '30g', type: MealType.SNACK },
  { name: '苹果', calories: 95, unit: '个', type: MealType.SNACK },
];

export const COLORS = {
  primary: '#BC8A5F', // 温暖的黄棕色
  secondary: '#D4A373',
  accent: '#FAEDCD', // 浅奶油色
  success: '#82954B', // 橄榄绿，更自然
  warning: '#E9C46A',
  danger: '#BC6C25',
  bg: '#FDFBF7', // 极简米白
  text: '#4A3E31', // 深咖色文字
};
