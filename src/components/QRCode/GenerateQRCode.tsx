// GenerateQRCode.tsx
import React, { useState } from 'react'
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
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'
import api from '../../utils/api'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import { useAppSelector } from '../../hooks/useAppSelector'
import QRCodeCard from './QRCodeCard' // Import the QRCodeCard component
import junction from '../../assets/images/junction.png'

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

const GenerateQRCode: React.FC = () => {
  const [url, setUrl] = useState('')
  const [foregroundColor, setForegroundColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [logo, setLogo] = useState<File | null>(null)
  const [qrCode, setQrCode] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { token } = useAppSelector((state) => state.auth)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setLogo(event.target.files[0])
    }
  }

  const handleDownload = (qrCode: string) => {
    const link = document.createElement('a')
    link.href = qrCode
    link.download = 'qrcode.png' // Or generate a unique name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSubmit = async () => {
    if (!url) {
      setError('Please enter a valid URL')
      return
    }

    const formData = new FormData()
    formData.append('url', url)
    formData.append('foregroundColor', foregroundColor)
    formData.append('backgroundColor', backgroundColor)
    if (logo) formData.append('logo', logo)

    setLoading(true)
    setError('')
    setQrCode('') // Clear previous QR codes

    try {
      const response = await api.post('/qrcodes/generate', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      })

      // Convert the response to a Blob URL
      const qrBlobUrl = URL.createObjectURL(response.data)
      setQrCode((prev) => qrBlobUrl) // Add new QR code to the array
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

        <TextField
          fullWidth
          size="small"
          label="Input your URL* to generate QR code"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <Box display="flex">
          <TextField
            sx={{ width: '25%' }}
            size="small"
            type="color"
            label="Foreground Color"
            value={foregroundColor}
            onChange={(e) => setForegroundColor(e.target.value)}
          />
          <Box width={20} />
          <TextField
            sx={{ width: '25%' }}
            size="small"
            type="color"
            label="Background Color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </Box>

        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Upload Logo (Optional)
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

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

        {error && (
          <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="error">{error}</Alert>
          </Snackbar>
        )}

        {success && (
          <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="success">QR Code generated successfully!</Alert>
          </Snackbar>
        )}
      </FormContainer>

      <QRCodeCard
        qrCode={qrCode}
        title={'Your QR code'}
        handleDownload={() => handleDownload(qrCode)}
      />
    </PageContainer>
  )
}

export default GenerateQRCode
