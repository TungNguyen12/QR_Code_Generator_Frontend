import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Save, Share, Download } from '@mui/icons-material'
import { styled } from '@mui/system'
import { QRCodeSVG } from 'qrcode.react'

const QRCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  gap: theme.spacing(2),
}))

interface QRCodeCardProps {
  qrCode: string | null
  title: string | null
  handleDownload: (url: string) => void
}

const IconButton: React.FC<{
  onClick: () => void
  icon: React.ReactNode
  disabled: boolean
}> = ({ onClick, icon, disabled }) => {
  return (
    <Button
      onClick={onClick}
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
      disabled={disabled}
    >
      {icon}
    </Button>
  )
}

const QRCodeCard: React.FC<QRCodeCardProps> = ({ qrCode, title }) => {
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
    <QRCard>
      <Typography
        variant="h4"
        component="h3"
        gutterBottom
        style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}
      >
        {title ? title : 'Sample QR code'}
      </Typography>

      <QRCodeSVG
        value={qrCode ? qrCode : 'https://www.google.com/'}
        size={100}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          onClick={() => {}}
          icon={<Save sx={{ color: 'white' }} />}
          disabled={!qrCode}
        />
        <IconButton
          onClick={() => {}}
          icon={<Share sx={{ color: 'white' }} />}
          disabled={!qrCode}
        />
        <IconButton
          onClick={handleDownload}
          icon={<Download sx={{ color: 'white' }} />}
          disabled={!qrCode}
        />
      </Box>
    </QRCard>
  )
}

export default QRCodeCard
