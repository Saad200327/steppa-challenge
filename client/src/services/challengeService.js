import api from './api';

export const getChallenges = async () => {
  const { data } = await api.get('/challenges');
  return data;
};

export const getChallenge = async (id) => {
  const { data } = await api.get(`/challenges/${id}`);
  return data;
};

export const joinChallenge = async (id, amount) => {
  const { data } = await api.post(`/challenges/${id}/join`, { amount });
  return data;
};

export const getChallengeLeaderboard = async (id) => {
  const { data } = await api.get(`/challenges/${id}/leaderboard`);
  return data;
};

export const getChallengeHistory = async () => {
  const { data } = await api.get('/challenges/history');
  return data;
};
