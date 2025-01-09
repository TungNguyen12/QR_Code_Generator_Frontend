import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector'

const CheckLogin = ({ children }: any) => {
  const validUser = useAppSelector((state) => state.auth.token)

  return validUser ? children : <Navigate to="/login" />
}

export default CheckLogin
