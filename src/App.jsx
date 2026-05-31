import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { LoginForm } from './auth-service/components/LoginForm'
import { RegisterForm } from './auth-service/components/RegisterForm'
import { ForgotPasswordForm } from './auth-service/components/ForgotPasswordForm'
import { ResetPasswordForm } from './auth-service/components/ResetPasswordForm'
import { ProtectedRoute } from './auth-service/components/ProtectedRoute'
import { useAuth } from './auth-service/hooks/useAuth'

const TabLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `rounded-full px-4 py-2 text-sm font-medium transition ${
        isActive
          ? 'bg-indigo-600 text-white shadow'
          : 'bg-white text-slate-600 shadow-sm hover:text-slate-900'
      }`
    }
  >
    {children}
  </NavLink>
)

const LoginPage = () => {
  const navigate = useNavigate()
  return <LoginForm onSuccess={() => navigate('/dashboard')} />
}

const DashboardPage = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="w-full max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">Session active</h2>
        <p className="text-sm text-slate-600">
          Connecte en tant que{' '}
          <span className="font-medium text-slate-900">{user?.email ?? ''}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={handleSignOut}
        className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
      >
        Se deconnecter
      </button>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 px-4 py-10 text-left">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
            Auth Service
          </p>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-slate-900">
              Formulaires Supabase
            </h1>
            <p className="max-w-2xl text-sm text-slate-600">
              Utilise ces ecrans pour tester la connexion, l'inscription et la
              reinitialisation de mot de passe.
            </p>
          </div>
        </header>

        <nav className="flex flex-wrap gap-2">
          <TabLink to="/login">Connexion</TabLink>
          <TabLink to="/register">Inscription</TabLink>
          <TabLink to="/forgot-password">Mot de passe oublie</TabLink>
          <TabLink to="/reset-password">Nouveau mot de passe</TabLink>
          <TabLink to="/dashboard">Dashboard</TabLink>
        </nav>

        <div className="flex w-full justify-center">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  redirectTo="/login"
                  fallback={<div className="text-sm text-slate-500">Chargement...</div>}
                >
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
