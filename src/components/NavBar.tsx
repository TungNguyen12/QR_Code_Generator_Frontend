import React from 'react'
import { AppBar, Box, Toolbar, Button, CardMedia, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate, useMatch } from 'react-router-dom'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { logout } from '../redux/slices/authSlice'
import navbarwave from '../assets/images/navbarwave.svg'
import platform from '../assets/images/platform.png'

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

interface NavBarButtonProps {
  label: string
  onClick: () => void
  variant: 'contained' | 'outlined'
  sx?: object
}

const NavBarButton: React.FC<NavBarButtonProps> = ({
  label,
  onClick,
  variant,
  sx,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      sx={{
        width: '100px',
        marginLeft: '16px',
        borderRadius: '13px',
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
    >
      {label}
    </StyledButton>
  )
}

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.auth.token)
  const matchHistory = useMatch('/history')

  const handleLogout = () => {
    dispatch(logout())
  }

  const qrButtonProps = matchHistory
    ? {
        label: 'Dashboard',
        onClick: () => navigate('/dashboard'),
      }
    : {
        label: 'My QR',
        onClick: () => navigate('/history'),
      }

  return (
    <AppBar position="static">
      <Box
        sx={{
          backgroundColor: 'black',
          width: '100%',
          height: '72px',
          backgroundImage: `url(${navbarwave})`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Toolbar
          sx={{
            padding: 0,
            minHeight: '72px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '100px' }}>
            <Link
              onClick={() => navigate(`/dashboard`)}
              sx={{ cursor: 'pointer' }}
            >
              <CardMedia
                component="img"
                image={platform}
                alt={'Junction Platform'}
                style={{ objectFit: 'contain' }}
              />
            </Link>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {token ? (
              <>
                <NavBarButton
                  label="Logout"
                  onClick={handleLogout}
                  variant="outlined"
                  sx={{ backgroundColor: 'white' }}
                />
                <NavBarButton
                  label={qrButtonProps.label}
                  onClick={qrButtonProps.onClick}
                  variant="contained"
                />
              </>
            ) : (
              <>
                <NavBarButton
                  label="Login"
                  onClick={() => navigate(`/login`)}
                  variant="outlined"
                  sx={{ backgroundColor: 'white' }}
                />
                <NavBarButton
                  label="Register"
                  onClick={() => navigate(`/register`)}
                  variant="contained"
                />
              </>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default NavBar
