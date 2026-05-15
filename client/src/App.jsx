import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import Landing from './pages/Landing'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard'
import ActiveChallenge from './pages/ActiveChallenge'
import Leaderboard from './pages/Leaderboard'
import History from './pages/History'
import Wallet from './pages/Wallet'
import Profile from './pages/Profile'
import Friends from './pages/Friends'
import Settings from './pages/Settings'
import PageWrapper from './components/layout/PageWrapper'

function ProtectedRoute({ children }) {
  const token = useAuthStore((s) => s.token)
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter basename="/steppa-challenge">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a26',
            color: '#f0f0f8',
            border: '1px solid #2a2a3d',
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.875rem',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/challenge/:id" element={<ProtectedRoute><PageWrapper><ActiveChallenge /></PageWrapper></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><PageWrapper><Leaderboard /></PageWrapper></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><PageWrapper><History /></PageWrapper></ProtectedRoute>} />
        <Route path="/wallet" element={<ProtectedRoute><PageWrapper><Wallet /></PageWrapper></ProtectedRoute>} />
        <Route path="/profile/:username" element={<ProtectedRoute><PageWrapper><Profile /></PageWrapper></ProtectedRoute>} />
        <Route path="/social" element={<ProtectedRoute><PageWrapper><Friends /></PageWrapper></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><PageWrapper><Settings /></PageWrapper></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
