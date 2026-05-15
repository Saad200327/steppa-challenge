import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Onboard from './pages/Onboard';
import Dashboard from './pages/Dashboard';
import ActiveChallenge from './pages/ActiveChallenge';
import LeaderboardPage from './pages/LeaderboardPage';
import History from './pages/History';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import Settings from './pages/Settings';
import PageWrapper from './components/layout/PageWrapper';

function Protected({ children }) {
  const token = useAuthStore(s => s.token);
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#12121a', color: '#f0f0f8', border: '1px solid #2a2a3d' },
        }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboard" element={<Protected><Onboard /></Protected>} />
        <Route path="/dashboard" element={<Protected><PageWrapper><Dashboard /></PageWrapper></Protected>} />
        <Route path="/challenge/:id" element={<Protected><PageWrapper><ActiveChallenge /></PageWrapper></Protected>} />
        <Route path="/leaderboard" element={<Protected><PageWrapper><LeaderboardPage /></PageWrapper></Protected>} />
        <Route path="/history" element={<Protected><PageWrapper><History /></PageWrapper></Protected>} />
        <Route path="/wallet" element={<Protected><PageWrapper><Wallet /></PageWrapper></Protected>} />
        <Route path="/profile/:username" element={<Protected><PageWrapper><Profile /></PageWrapper></Protected>} />
        <Route path="/social" element={<Protected><PageWrapper><Friends /></PageWrapper></Protected>} />
        <Route path="/settings" element={<Protected><PageWrapper><Settings /></PageWrapper></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
