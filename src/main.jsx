import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './auth-service/context/AuthProvider'

const baseUrl = window.location.origin
const emailRedirectTo = `${baseUrl}/dashboard`
const passwordResetRedirectTo = `${baseUrl}/reset-password`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider
      emailRedirectTo={emailRedirectTo}
      passwordResetRedirectTo={passwordResetRedirectTo}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
