import React, { useState, useRef, useEffect } from 'react'
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
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import { styled } from '@mui/material/styles'
import { Download, Save, Share } from '@mui/icons-material'
import api from '../utils/api'
import brandlogo from '../assets/images/brandlogo.png'
import sample_qr from '../assets/images/sample_qr.png'
import { useAppSelector } from '../hooks/useAppSelector'

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
  margin: '8px',
  width: '100%',
  borderRadius: '13px',
  textTransform: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
}))

const InputField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    height: 40,
  },
  marginBottom: '18px',
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
  const urlInputRef = useRef<HTMLInputElement | null>(null)
  const titleInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (urlInputRef.current && document.activeElement !== urlInputRef.current) {
      urlInputRef.current.focus()
    }
  }, [url])

  useEffect(() => {
    if (
      titleInputRef.current &&
      document.activeElement !== titleInputRef.current
    ) {
      titleInputRef.current.focus()
    }
  }, [title])

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
      link.download = 'qrcode.png'
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
    formData.append('foreground_color', foregroundColor)
    formData.append('background_color', backgroundColor)
    if (logo) formData.append('logo', logo)

    setLoading(true)
    setError('')
    setQrCode(null)
    setSuccess(false)

    try {
      const response = await api.post('/qrcodes/generate', formData, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      })

      const qrBlobUrl = URL.createObjectURL(response.data)
      setQrCode(qrBlobUrl)
      setSuccess(true)
    } catch (error) {
      setError('Failed to generate QR code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer>
      <FormContainer elevation={4}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginBottom: '20px',
          }}
        >
          <Avatar
            alt="Company Logo"
            src={brandlogo}
            sx={{ width: 150, height: 150 }}
          />
        </Box>
        <Typography
          variant="h4"
          gutterBottom
          style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}
        >
          Generate Your Custom QR Code
        </Typography>

        <Box sx={{ mt: '20px', mb: '20px' }}>
          <InputField
            fullWidth
            size="small"
            type="text"
            label="Input your URL* to generate QR code"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
              setSuccess(false)
            }}
            inputRef={urlInputRef}
          />
          <InputField
            fullWidth
            size="small"
            type="text"
            label="QR title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setSuccess(false)
            }}
            inputRef={titleInputRef}
          />

          <Box display="flex">
            <InputField
              sx={{ width: '25%' }}
              size="small"
              type="color"
              label="Foreground Color"
              value={foregroundColor}
              onChange={(e) => setForegroundColor(e.target.value)}
            />
            <Box width={20} />
            <InputField
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
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mt: '10px',
            mb: '20px',
          }}
        >
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            endIcon={!loading && <QrCodeScannerIcon fontSize="small" />}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate QR Code'}
          </StyledButton>
        </Box>

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

      <QRCard>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {qrCode ? title : 'Sample QR code'}
        </Typography>
        <QRCodeImage
          src={qrCode ? qrCode : sample_qr}
          alt={qrCode ? 'Generated QR Code' : 'Sample QR'}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <StyledButton variant="contained" disabled={!qrCode}>
            <Save sx={{ color: 'white' }} />
          </StyledButton>
          <StyledButton variant="contained" disabled={!qrCode}>
            <Share sx={{ color: 'white' }} />
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={handleDownload}
            disabled={!qrCode}
          >
            <Download sx={{ color: 'white' }} />
          </StyledButton>
        </Box>
      </QRCard>
    </PageContainer>
  )
}

export default Dashboard
