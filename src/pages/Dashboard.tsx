import React, { useEffect, useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Avatar,
  IconButton,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import api from '../utils/api'
import junction from '../public/images/junction.png'
import sample_qr from '../public/images/sample_qr.png'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import { useAppSelector } from '../hooks/useAppSelector'
import { Download, Save, Share } from '@mui/icons-material'
import DataInput from '../components/DataInput'

// Custom Styled Components
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(5),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}))

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))

const Dashboard: React.FC = () => {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [foregroundColor, setForegroundColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [logo, setLogo] = useState<File | null>(null)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { token } = useAppSelector((state) => state.auth)

  const PageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    maxWidth: '80%',
    margin: 'auto',
    alignItems: 'center',
    gap: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  }))

  const QRCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    gap: theme.spacing(2),
  }))

  const QRCodeImage = styled('img')({
    maxWidth: '50%',
    borderRadius: '10px',
    border: `4px solid rgb(107, 9, 255)`,
  })

  // Handle File Upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setLogo(event.target.files[0])
    }
  }

  const handleDownload = () => {
    if (qrCode) {
      const link = document.createElement('a')
      link.href = qrCode
      link.download = 'qrcode.png' // Or generate a unique name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Submit QR Code Generation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) {
      setError('Please enter a valid URL')
      return
    }

    const formData = new FormData()
    formData.append('url', url)
    formData.append('title', title)
    formData.append('foregroundColor', foregroundColor)
    formData.append('backgroundColor', backgroundColor)
    if (logo) formData.append('logo', logo)

    setLoading(true)
    setError('')
    setQrCode(null)

    try {
      const response = await api.post('/qrcodes/generate', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      })

      // Convert the response to a Blob URL
      const qrBlobUrl = URL.createObjectURL(response.data)
      console.log(qrBlobUrl)
      setQrCode(qrBlobUrl)
      console.log(qrCode)
      setSuccess(true)
    } catch (error) {
      setError('Failed to generate QR code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer>
      <FormContainer
        elevation={4}
        sx={{
          '& > *': {
            marginTop: '10px',
            marginBottom: '20px',
          },
          mt: '0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
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
        </Box>
        <Typography
          variant="h4"
          component="h3"
          gutterBottom
          style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}
        >
          Generate Your Custom QR Code
        </Typography>
        <Box
          marginTop={'20px'}
          sx={{
            '& > *': {
              marginBottom: '18px !important',
            },
          }}
        >
          <TextField
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                height: 40,
              },
            }}
            size="small"
            type="text"
            label="Input your URL* to generate QR code"
            value={url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
          />
          {/* <DataInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
            value="url"
            size="small"
            type="text"
            label="Input your URL* to generate QR code"
          /> */}
          <TextField
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                height: 40,
              },
            }}
            size="small"
            type="text"
            label="QR title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />

          <Box display="flex">
            <TextField
              sx={{
                width: '25%',
                '& .MuiInputBase-root': {
                  height: 40,
                },
              }}
              size="small"
              type="color"
              label="Foreground Color"
              value={foregroundColor}
              onChange={(e) => setForegroundColor(e.target.value)}
            />
            <Box width={20} />
            <TextField
              sx={{
                width: '25%',
                '& .MuiInputBase-root': {
                  // Target the input base
                  height: 40,
                },
              }}
              size="small"
              type="color"
              label="Background Color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </Box>
          {/* File Upload Button */}
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Upload Logo (Optional)
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Box>

        {/* Generate Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              width: '100%',
              borderRadius: '13px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
            endIcon={!loading && <QrCodeScannerIcon fontSize="small" />}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate QR Code'}
          </StyledButton>
        </Box>

        {/* Error Message */}
        {error && (
          <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="error">{error}</Alert>
          </Snackbar>
        )}

        {/* Success Message */}
        {success && (
          <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="success">QR Code generated successfully!</Alert>
          </Snackbar>
        )}
      </FormContainer>

      <QRCard>
        <Typography
          variant="h4"
          component="h3"
          gutterBottom
          style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}
        >
          {qrCode ? 'Your QR code' : 'Sample QR code'}
        </Typography>

        <QRCodeImage
          src={qrCode ? qrCode : sample_qr}
          alt={qrCode ? 'Generated QR Code' : 'Sample QR'}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <StyledButton
            variant="contained"
            sx={{
              borderRadius: '13px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              margin: ' 8px',
              height: '36px',
            }}
            disabled={!qrCode}
          >
            <IconButton sx={{ color: 'white' }}>
              <Save />
            </IconButton>
          </StyledButton>
          <StyledButton
            variant="contained"
            sx={{
              borderRadius: '13px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              margin: '8px',
              height: '36px',
            }}
            disabled={!qrCode}
          >
            <IconButton sx={{ color: 'white' }}>
              <Share />
            </IconButton>
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={handleDownload}
            sx={{
              borderRadius: '13px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              margin: '8px',
              height: '36px',
            }}
            disabled={!qrCode}
          >
            <IconButton sx={{ color: 'white' }}>
              <Download />
            </IconButton>
          </StyledButton>
        </Box>
      </QRCard>
    </PageContainer>
  )
}

export default Dashboard
