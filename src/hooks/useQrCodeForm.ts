import { useState } from 'react'
import api from '../utils/api'
import { useAppSelector } from './useAppSelector'

interface UseQrCodeFormProps {
  onSuccess: (url: string) => void
  onError: (error: string) => void
}

interface UseQrCodeFormReturn {
  url: string
  title: string
  foregroundColor: string
  backgroundColor: string
  logo: File | null
  setUrl: (url: string) => void
  setTitle: (title: string) => void
  setForegroundColor: (color: string) => void
  setBackgroundColor: (color: string) => void
  setLogo: (logo: File | null) => void
  loading: boolean
  handleSubmit: (e: React.FormEvent) => Promise<void>
  clearQrCode: () => void
}

const useQrCodeForm = ({
  onSuccess,
  onError,
}: UseQrCodeFormProps): UseQrCodeFormReturn => {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [foregroundColor, setForegroundColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [logo, setLogo] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const { token } = useAppSelector((state) => state.auth)

  const clearQrCode = () => {
    setUrl('')
    setTitle('')
    setForegroundColor('#000000')
    setBackgroundColor('#ffffff')
    setLogo(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) {
      onError('Please enter a valid URL')
      return
    }

    const formData = new FormData()
    formData.append('url', url)
    formData.append('title', title)
    formData.append('foreground_color', foregroundColor)
    formData.append('background_color', backgroundColor)
    if (logo) formData.append('logo', logo)

    setLoading(true)

    try {
      const response = await api.post('/qrcodes/generate', formData, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      })

      const qrBlobUrl = URL.createObjectURL(response.data)
      onSuccess(qrBlobUrl)
    } catch (error) {
      onError('Failed to generate QR code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return {
    url,
    title,
    foregroundColor,
    backgroundColor,
    logo,
    setUrl,
    setTitle,
    setForegroundColor,
    setBackgroundColor,
    setLogo,
    loading,
    handleSubmit,
    clearQrCode,
  }
}

export default useQrCodeForm
