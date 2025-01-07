import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const BackDashboardButton = () => {
  const navigate = useNavigate()
  const handleToDashboard = () => {
    navigate(`dashboard`)
  }

  return (
    <Button
      onClick={handleToDashboard}
      sx={{
        margin: '25px auto',
        bgcolor: '#1976d2',
        color: '#fff',
        '&.MuiButtonBase-root:hover': {
          bgcolor: '#1976d2',
          opacity: '0.9',
        },
      }}
    >
      Back to Dashboard
    </Button>
  )
}

export default BackDashboardButton
