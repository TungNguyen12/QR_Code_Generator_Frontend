import { Button, TextField, Box, styled } from '@mui/material'

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  margin: '8px',
  width: '100%',
  borderRadius: '13px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
}))

export const InputField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    height: 40,
  },
  marginBottom: '18px',
}))

export const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  margin: 'auto',
  alignItems: 'center',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}))

export const QRCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  gap: theme.spacing(2),
  minWidth: '40%',
}))
