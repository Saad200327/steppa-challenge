import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { UserPlus, Users } from 'lucide-react';
import api from '../services/api';
import Avatar from '../components/ui/Avatar';
import FriendsList from '../components/social/FriendsList';
import GroupChallenge from '../components/social/GroupChallenge';
import TauntCard from '../components/social/TauntCard';

export default function Friends() {
  const [tab, setTab] = useState('friends');
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState('');
  const [groupCode, setGroupCode] = useState('');

  useEffect(() => {
    api.get('/social/friends').then(r => setFriends(r.data)).catch(() => {});
  }, []);

  const sendRequest = async () => {
    try {
      await api.post('/social/friends/request', { username: search });
      toast.success('Friend request sent!');
      setSearch('');
    } catch { toast.error('Could not send request'); }
  };

  const joinGroup = async () => {
    try {
      await api.post(`/social/groups/join/${groupCode}`);
      toast.success('Joined group!');
      setGroupCode('');
    } catch { toast.error('Invalid invite code'); }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="font-display text-2xl font-bold text-white mb-6">Friends & Groups</h1>
      <div className="flex gap-2 mb-6">
        {['friends', 'groups'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? 'bg-steppa-green text-black' : 'bg-steppa-surface border border-steppa-border text-steppa-muted hover:border-steppa-green'}`}>{t}</button>
        ))}
      </div>

      {tab === 'friends' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input className="input flex-1" placeholder="Search username..." value={search} onChange={e => setSearch(e.target.value)} />
            <button className="btn btn-primary" onClick={sendRequest}><UserPlus size={16} /></button>
          </div>
          <FriendsList friends={friends} onTaunt={userId => api.post(`/social/taunt/${userId}`, { message: "Still need more steps? Yikes." }).then(() => toast.success('Taunt sent!'))} />
        </div>
      )}

      {tab === 'groups' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input className="input flex-1" placeholder="Invite code..." value={groupCode} onChange={e => setGroupCode(e.target.value)} />
            <button className="btn btn-primary" onClick={joinGroup}>Join</button>
          </div>
          <GroupChallenge />
        </div>
      )}
    </div>
  );
}
