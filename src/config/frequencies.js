export const FREQUENCY_OPTIONS = {
  // every15Minutes: "Every 15 minutes",
  // every30Minutes: "Every 30 minutes",
  // everyHour: "Every hour",
  // every2Hours: "Every 2 hours",
  // every4Hours: "Every 4 hours",
  // every6Hours: "Every 6 hours",
  // twicePerDay: "Twice per day (every 12 hours)",
  oncePerDay: "Once per day (every 24 hours)",
  twicePerWeek: "Twice per week",
  every3Days: "Every 3 days",
  oncePerWeek: "Once per week",
};

export const getFrequencyOptions = () => {
  return Object.entries(FREQUENCY_OPTIONS).map(([value, label]) => ({
    value,
    label
  }));
};
