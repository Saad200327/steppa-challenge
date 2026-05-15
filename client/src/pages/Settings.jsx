import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';

export default function Settings() {
  const { user, setAuth } = useAuthStore();
  const [form, setForm] = useState({ displayName: user?.displayName || '', bio: user?.bio || '' });
  const [notifications, setNotifications] = useState({ panicAlerts: true });
  const [privacy, setPrivacy] = useState({ publicProfile: true });

  const saveProfile = async () => {
    try {
      const r = await api.put('/auth/me', form);
      setAuth(r.data, useAuthStore.getState().token);
      toast.success('Profile updated!');
    } catch { toast.error('Update failed'); }
  };

  const deleteAccount = async () => {
    if (!confirm('This cannot be undone. Delete your account?')) return;
    try {
      await api.delete('/auth/me');
      useAuthStore.getState().logout();
      toast.success('Account deleted');
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">Settings</h1>

      {/* Profile */}
      <div className="bg-steppa-surface border border-steppa-border rounded-xl p-6 space-y-4">
        <h2 className="font-bold text-white">Profile</h2>
        <div><label className="label">Display Name</label><input className="input" value={form.displayName} onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))} /></div>
        <div><label className="label">Bio</label><textarea className="input resize-none h-20" value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} /></div>
        <button className="btn btn-primary" onClick={saveProfile}>Save Changes</button>
      </div>

      {/* Notifications */}
      <div className="bg-steppa-surface border border-steppa-border rounded-xl p-6 space-y-3">
        <h2 className="font-bold text-white">Notifications</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={notifications.panicAlerts} onChange={e => setNotifications(n => ({ ...n, panicAlerts: e.target.checked }))} />
          <span className="text-steppa-muted text-sm">Panic alerts (11pm, 11:30pm, 11:52pm)</span>
        </label>
      </div>

      {/* Privacy */}
      <div className="bg-steppa-surface border border-steppa-border rounded-xl p-6 space-y-3">
        <h2 className="font-bold text-white">Privacy</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={privacy.publicProfile} onChange={e => setPrivacy(p => ({ ...p, publicProfile: e.target.checked }))} />
          <span className="text-steppa-muted text-sm">Public profile</span>
        </label>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-950/30 border border-steppa-red/40 rounded-xl p-6">
        <h2 className="font-bold text-steppa-red mb-3">Danger Zone</h2>
        <button onClick={deleteAccount} className="btn border border-steppa-red text-steppa-red hover:bg-steppa-red hover:text-white transition-all text-sm">Delete Account</button>
      </div>
    </div>
  );
}
