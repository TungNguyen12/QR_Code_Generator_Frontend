import { Box, CardMedia, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import navbarwave from '../assets/images/navbarwave.svg'
import junction from '../assets/images/junction.svg'

// FooterContainer with flipped background image
const FooterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'black',
  backgroundImage: `url(${navbarwave})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transform: 'rotate(180deg)',
  padding: theme.spacing(3, 0),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  bottom: 0,
}))

const Footer = () => {
  return (
    <FooterContainer position="static">
      <Link
        href="https://www.hackjunction.com/"
        target="_blank"
        sx={{ cursor: 'pointer' }}
      >
        <CardMedia
          component="img"
          image={junction}
          alt="Junction Platform"
          sx={{
            objectFit: 'contain',
            maxWidth: '200px',
            transform: 'rotate(180deg)',
          }}
        />
      </Link>
    </FooterContainer>
  )
}

export default Footer
