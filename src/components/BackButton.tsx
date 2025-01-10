import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

interface BackButtonProps {
  to: string
  text?: string
  sx?: object
}

const BackButton: React.FC<BackButtonProps> = ({ to, text = 'Back', sx }) => {
  const navigate = useNavigate()
  const handleNavigation = () => {
    navigate(to)
  }

  return (
    <Button
      onClick={handleNavigation}
      sx={{
        margin: '25px auto',
        bgcolor: '#1976d2',
        color: '#fff',
        '&.MuiButtonBase-root:hover': {
          bgcolor: '#1976d2',
          opacity: '0.9',
        },
        ...sx,
      }}
    >
      {text}
    </Button>
  )
}

export default BackButton
