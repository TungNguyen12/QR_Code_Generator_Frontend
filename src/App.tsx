import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Pages
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import GenerateQRCode from './components/QRCode/GenerateQRCode'

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { path: '', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'history', element: <History /> },
        { path: 'generate', element: <GenerateQRCode /> },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
