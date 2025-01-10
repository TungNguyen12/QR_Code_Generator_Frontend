import React, { useState, useRef, useEffect } from 'react'
import {
  Typography,
  Paper,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Avatar,
  Button,
  styled,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import brandlogo from '../assets/images/brandlogo.png'
import {
  StyledButton,
  InputField,
  PageContainer,
} from '../components/ui/StyledComponents'
import useQrCodeForm from '../hooks/useQrCodeForm'
import QRCodeDisplay from '../components/QRCodeDisplay'

// Custom Styled Components
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(5),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}))

const Dashboard: React.FC = () => {
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string>('')
  const urlInputRef = useRef<HTMLInputElement | null>(null)
  const titleInputRef = useRef<HTMLInputElement | null>(null)

  const handleSuccess = (url: string) => {
    setQrCode(url)
    setSuccess(true)
  }

  const handleError = (error: string) => {
    setError(error)
  }

  const {
    url,
    title,
    foregroundColor,
    backgroundColor,
    setUrl,
    setTitle,
    setForegroundColor,
    setBackgroundColor,
    setLogo,
    loading,
    handleSubmit,
  } = useQrCodeForm({ onSuccess: handleSuccess, onError: handleError })

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
              setQrCode(null)
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
              setQrCode(null)
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
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setError('')}
          >
            <Alert severity="error">{error}</Alert>
          </Snackbar>
        )}
        {success && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setSuccess(false)}
          >
            <Alert severity="success">QR Code generated successfully!</Alert>
          </Snackbar>
        )}
      </FormContainer>
      <QRCodeDisplay
        qrCode={qrCode}
        title={title}
        handleDownload={handleDownload}
      />
    </PageContainer>
  )
}

export default Dashboard
