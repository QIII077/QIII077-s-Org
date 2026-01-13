
// Corrected import: ACTIVITY_MULTIPLIERS is exported from constants.ts, not types.ts
import { UserProfile, GoalType } from './types';
import { ACTIVITY_MULTIPLIERS } from './constants';

/**
 * Mifflin-St Jeor Formula for BMR
 */
export const calculateBMR = (profile: UserProfile): number => {
  const { weight, height, age, gender } = profile;
  if (gender === 'female') {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return 10 * weight + 6.25 * height - 5 * age + 5;
};

export const calculateTDEE = (profile: UserProfile): number => {
  const bmr = calculateBMR(profile);
  const multiplier = ACTIVITY_MULTIPLIERS[profile.activityLevel];
  return Math.round(bmr * multiplier);
};

export const calculateDailyGoal = (profile: UserProfile): number => {
  const tdee = calculateTDEE(profile);
  switch (profile.goal) {
    case GoalType.LOSE: return tdee - 500;
    case GoalType.GAIN: return tdee + 300;
    default: return tdee;
  }
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export const getTodayKey = () => new Date().toISOString().split('T')[0];
