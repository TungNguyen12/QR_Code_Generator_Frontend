// QRCodeCard.tsx
import React from 'react'
import { Box, IconButton, Button, Typography } from '@mui/material'
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

const QRCodeCard: React.FC<QRCodeCardProps> = ({
  qrCode,
  title,
  handleDownload,
}) => {
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
        <Button
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
          <Save sx={{ color: 'white' }} />
        </Button>

        <Button
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
          <Share sx={{ color: 'white' }} />
        </Button>

        <Button
          variant="contained"
          onClick={() => qrCode && handleDownload(qrCode)}
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
          <Download sx={{ color: 'white' }} />
        </Button>
      </Box>
    </QRCard>
  )
}

export default QRCodeCard
