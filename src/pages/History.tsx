import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { Alert, Avatar, Box, Grid, Stack, Typography } from '@mui/material'
import BackDashboardButton from '../components/BackDashboardButton'
import api from '../utils/api'
import { QRCodeType } from '../types/qrcode'
import QRCodeCard from '../components/qr/QRCodeCard'
import junction from '../assets/images/junction.png'
import { useCallback } from 'react'

const History = () => {
  const [qrCodes, setQrCodes] = useState<QRCodeType[]>([])
  const [error, setError] = useState('')
  const { token } = useAppSelector((state) => state.auth)

  const getHistory = useCallback(async () => {
    try {
      const response = await api.get('/qrcodes/my_qrcodes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const list = response.data as QRCodeType[]
      setQrCodes(list)
      console.log(list)
    } catch (error) {
      setError('Failed to generate QR code. Please try again.')
    }
  }, [token])

  const handleDownload = (qrCode: string) => {
    if (qrCode) {
      const link = document.createElement('a')
      link.href = qrCode
      link.download = 'qrcode.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  useEffect(() => {
    if (token) {
      getHistory()
    }
  }, [token, getHistory])

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
        {qrCodes && (
          <>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: '20px',
                }}
                padding={'10px'}
              >
                <Avatar
                  alt="Company Logo"
                  src={junction}
                  sx={{ width: 150, height: 150 }} // Adjust size as needed
                />
                <Typography
                  variant="h4"
                  component="h3"
                  gutterBottom
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Your QR Codes
                </Typography>
              </Box>
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
                        {error}
                      </Alert>
                    </Stack>
                    <BackDashboardButton />
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
