export const calculateProgress = (steps, goal) =>
  Math.min(Math.round((steps / goal) * 100), 100);

export const calculateStepsNeeded = (steps, goal) =>
  Math.max(goal - steps, 0);

export const calculateProjectedPayout = (myBet, totalWinnerBets, loserPool, platformFee = 0.05) => {
  if (totalWinnerBets === 0) return myBet;
  const distributable = loserPool * (1 - platformFee);
  const shareRatio = myBet / totalWinnerBets;
  return myBet + distributable * shareRatio;
};

export const isGoalAtRisk = (steps, goal, endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const minutesLeft = (end - now) / 60000;
  const stepsNeeded = goal - steps;
  const stepsPerMinute = 100;
  return stepsNeeded > minutesLeft * stepsPerMinute;
};
