import axios from 'axios';
import { format } from 'date-fns';

export function getGoogleAuthUrl(state) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/fitness.activity.read',
    access_type: 'offline',
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

export async function exchangeGoogleCode(code) {
  const { data } = await axios.post('https://oauth2.googleapis.com/token', {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code',
  });
  return data;
}

export async function fetchGoogleFitSteps(accessToken, date) {
  const dateObj = new Date(date);
  const startMs = dateObj.setHours(0, 0, 0, 0);
  const endMs = dateObj.setHours(23, 59, 59, 999);
  const { data } = await axios.post(
    'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
    {
      aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }],
      bucketByTime: { durationMillis: 86400000 },
      startTimeMillis: startMs,
      endTimeMillis: endMs,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const steps = data.bucket?.[0]?.dataset?.[0]?.point?.reduce((s, p) => s + (p.value?.[0]?.intVal || 0), 0) || 0;
  return steps;
}
