import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AdminDashboard } from './components/AdminDashboard.tsx'

const isAdmin = window.location.pathname.includes('/admin') || window.location.hash.includes('#/admin');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? <AdminDashboard /> : <App />}
  </StrictMode>,
)
