import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useAppSelector'
import React from 'react'

interface CheckLoginProps {
  children: React.ReactNode
}

const CheckLogin: React.FC<CheckLoginProps> = ({ children }) => {
  const validUser = useAppSelector((state) => state.auth.token)

  return validUser ? children : <Navigate to="/login" />
}

export default CheckLogin
