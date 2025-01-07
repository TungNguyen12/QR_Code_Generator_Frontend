import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import junctionplatform from '../public/images/platform.png'
import navbarwave from '../public/images/navbarwave.svg'
import { Toolbar, Button, CardMedia, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

const NavBar = () => {
  const navigate = useNavigate()

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
          }}
        >
          <Box
            sx={{
              width: '100px',
              height: '72px',
            }}
          >
            <Link
              onClick={() => navigate(`/dashboard`)}
              sx={{ cursor: 'pointer' }}
            >
              <CardMedia
                component="img"
                image={junctionplatform}
                alt={'Junction'}
                style={{
                  objectFit: 'contain',
                }}
              />
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <StyledButton
              onClick={() => navigate(`/`)}
              // disabled={loading}
              sx={{
                width: '100px',
                marginLeft: '16px',
                borderRadius: '13px',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                textDecorationColor: 'primary',
              }}
            >
              Login
            </StyledButton>
            <StyledButton
              onClick={() => navigate(`/register`)}
              variant="contained"
              // disabled={loading}
              sx={{
                width: '100px',
                marginLeft: '16px',
                borderRadius: '13px',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Register
            </StyledButton>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default NavBar
