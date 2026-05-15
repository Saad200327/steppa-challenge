import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get(`/auth/profile/${username}`).then(r => setProfile(r.data)).catch(() => {});
  }, [username]);

  if (!profile) return <div className="p-6 text-steppa-muted">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-steppa-surface border border-steppa-border rounded-2xl p-8 flex items-center gap-6 mb-6">
        <Avatar user={profile} size="lg" />
        <div>
          <h1 className="font-display text-2xl font-bold text-white">{profile.displayName}</h1>
          <div className="text-steppa-muted text-sm">@{profile.username}</div>
          {profile.bio && <p className="text-steppa-muted text-sm mt-2">{profile.bio}</p>}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[['Wins', profile.totalWins],['Challenges', profile.totalChallenges],['Streak', profile.winStreak]].map(([l, v]) => (
          <div key={l} className="bg-steppa-surface border border-steppa-border rounded-xl p-4 text-center">
            <div className="font-mono text-2xl font-bold text-white">{v}</div>
            <div className="text-steppa-muted text-xs mt-1">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
