import { Box } from '@mui/material'
import Footer from '../Footer'
import NavBar from '../NavBar'
import { styled } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const MainContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  })

  return (
    <MainContainer>
      <NavBar />
      <main style={{ minHeight: '100%', margin: '50px auto', flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </MainContainer>
  )
}

export default Layout
