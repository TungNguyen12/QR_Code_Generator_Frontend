// GenerateQRCode.tsx
import React, { useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
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

const generateCode = yup
  .object({
    title: yup.string().required('Title is required'),
    url: yup.string().url().required('Image is required and has to be an URL'),
    backgroundColor: yup.string().optional(),
    foregroundColor: yup.string().optional(),
    logo: yup
      .mixed()
      .test(
        'fileSize',
        'File is too large, maximum size is 2MB',
        (value) =>
          !value || (value instanceof File && value.size <= 2 * 1024 * 1024)
      )
      .optional(),
  })
  .required()

const GenerateQRCode: React.FC = () => {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
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

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(generateCode),
  })

  const onSubmit = async (data: any) => {
    if (!url) {
      setError('Please enter a valid URL')
      return
    }

    const formData = new FormData()
    formData.append('url', data.url)
    formData.append('title', data.title)
    formData.append('backgroundColor', data.backgroundColor)
    formData.append('foregroundColor', data.foregroundColor)

    if (data.logo && data.logo[0]) {
      formData.append('logo', data.logo[0])
    }

    setLoading(true)
    setError('')
    setQrCode('')
    try {
      const response = await api.post('/qrcodes/generate', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
            sx={{ width: 150, height: 150 }}
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
          label="Input your URL* to generate QR code"
          size="small"
          id="url"
          value={url}
          error={Boolean(errors.url?.message)}
          helperText={errors.url?.message}
          {...register('url')}
          onChange={(e) => setUrl(e.target.value)}
        />
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
          id="title"
          error={Boolean(errors.title?.message)}
          helperText={errors.title?.message}
          {...register('title')}
          value={title}
          onChange={handleTitle}
        />

        <Box display="flex">
          <TextField
            sx={{ width: '25%' }}
            size="small"
            type="color"
            label="Foreground Color"
            id="foregroundColor"
            error={Boolean(errors.foregroundColor?.message)}
            helperText={errors.foregroundColor?.message}
            {...register('foregroundColor')}
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
          <input
            type="file"
            id="logo"
            {...register('logo')}
            hidden
            onChange={handleFileChange}
          />
        </Button>

        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
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
