export const STEP_GOALS = [5000, 7500, 10000, 15000];
export const DEFAULT_STEP_GOAL = 10000;
export const PLATFORM_FEE = 0.05;
export const STARTING_COINS = 100;

export const CHALLENGE_STATUS = {
  OPEN: 'open',
  ACTIVE: 'active',
  SETTLING: 'settling',
  SETTLED: 'settled',
};

export const BET_STATUS = {
  ACTIVE: 'active',
  WON: 'won',
  LOST: 'lost',
  VOIDED: 'voided',
};

export const TRANSACTION_TYPES = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
  BET_PLACED: 'bet_placed',
  BET_WON: 'bet_won',
  BET_LOST: 'bet_lost',
  PAYOUT: 'payout',
};

export const FITNESS_PROVIDERS = {
  GOOGLE_FIT: 'google_fit',
  FITBIT: 'fitbit',
  APPLE_HEALTH: 'apple_health',
  MANUAL: 'manual',
};
