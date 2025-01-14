import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import CheckLogin from './pages/auth/CheckLogin'

const App: React.FC = () => {
  const CheckedDashboard = () => (
    <CheckLogin>
      <Dashboard />
    </CheckLogin>
  )
  const CheckedHistory = () => (
    <CheckLogin>
      <History />
    </CheckLogin>
  )
  const CheckedToken = () => (
    <CheckLogin>
      <Dashboard />
    </CheckLogin>
  )

  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { path: '', element: <CheckedToken /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'dashboard', element: <CheckedDashboard /> },
        { path: 'history', element: <CheckedHistory /> },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
