const RANDOM_START_HOUR_MIN = 6;
const RANDOM_START_HOUR_MAX = 23;
const RANDOM_HOUR_RANGE = RANDOM_START_HOUR_MAX - RANDOM_START_HOUR_MIN;

export const generateRandomStartTime = (baseTime: Date): Date => {
  const randomHour = Math.floor(Math.random() * RANDOM_HOUR_RANGE) + RANDOM_START_HOUR_MIN;
  const randomMinute = Math.floor(Math.random() * 60);
  const randomStartTime = new Date(baseTime);
  randomStartTime.setHours(randomHour, randomMinute, 0, 0);
  return randomStartTime;
};