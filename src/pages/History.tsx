// React
import { useEffect, useState } from 'react'

// Redux
import { useAppSelector } from '../hooks/useAppSelector'

// MUI Components
import { Alert, Box, Card, CardContent, Grid, Stack } from '@mui/material'

// Custom Components
// import LoanBookCard from '../components/LoanBookCard'

// Toast
import BackHomeButton from '../components/BackHomeButton'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { getHistoryAsync } from '../redux/slices/historySlice'
import api from '../utils/api'
import { QRCodeType } from '../types/qrcode'
import QRCodeCard from '../components/QRCode/QRCodeCard'

const History = () => {
  const [qrCodes, setQrCodes] = useState<QRCodeType[]>([])
  const [error, setError] = useState('')
  const { token } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  const getHistory = async () => {
    try {
      const response = await api.get('/qrcodes/my_qrcodes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const list = response.data as QRCode[]
      // Convert the response to a Blob URL
      setQrCodes(list) // Add new QR code to the list
      console.log(list)
    } catch (error) {
      setError('Failed to generate QR code. Please try again.')
    }
  }
  const handleDownload = (qrCode: string) => {
    if (qrCode) {
      const link = document.createElement('a')
      link.href = qrCode
      link.download = 'qrcode.png' // Or generate a unique name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  useEffect(() => {
    if (token) {
      dispatch(getHistoryAsync(token))
      getHistory()
    }
  }, [])

  return (
    <Box sx={{ width: '70%', margin: 'auto' }}>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: '50px',
          height: 'vh',
          margin: 'auto',
        }}
      >
        {/* {isLoading && <CircularProgress sx={{ margin: '100px auto' }} />} */}

        {qrCodes && (
          <>
            <Box>
              <Card sx={{ marginBottom: '30px' }}>
                <CardContent>Active books</CardContent>
              </Card>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
                {qrCodes.length > 0 ? (
                  qrCodes.map((qrCode) => (
                    <Grid
                      key={qrCode._id}
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <QRCodeCard
                        qrCode={qrCode.url}
                        title={qrCode.title}
                        handleDownload={() => handleDownload(qrCode.url)}
                      />
                    </Grid>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Stack>
                      <Alert severity="error" sx={{ marginTop: '2rem' }}>
                        You have not borrowed any books yet, let find one 🧠!
                      </Alert>
                    </Stack>
                    <BackHomeButton />
                  </Box>
                )}
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default History
