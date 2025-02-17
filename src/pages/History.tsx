import { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { Alert, Avatar, Box, Grid, Stack, Typography } from '@mui/material'

import api from '../utils/api'
import { QRCodeType } from '../types/qrcode'
import QRCodeCard from '../components/QRCodeCard'
import brandlogo from '../assets/images/brandlogo.png'
import { useCallback } from 'react'
import BackButton from '../components/BackButton'
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

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Handle QR code deletion
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/qrcodes/qrcodes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // Update UI by filtering out the deleted QR code
      setQrCodes(qrCodes.filter((qrCode) => qrCode._id !== id))
    } catch (error) {
      setError('Failed to delete QR code. Please try again.')
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
                  alt="Company brand logo"
                  src={brandlogo}
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
                  Your QR
                </Typography>
              </Box>
              <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} columns={12}>
                {qrCodes.length > 0 ? (
                  qrCodes.map((qrCode) => (
                    <Grid
                      key={qrCode._id}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={4}
                      sx={{
                        display: 'flex',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                      }}
                    >
                      <QRCodeCard
                        qrCode={qrCode.url}
                        title={qrCode.title}
                        _id={qrCode._id}
                        handleDownload={handleDownload}
                        handleDelete={handleDelete}
                        background_color={qrCode.background_color}
                        foreground_color={qrCode.foreground_color}
                        created_at={qrCode.created_at}
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
                    <BackButton to="/dashboard" text="Dashboard" />
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
