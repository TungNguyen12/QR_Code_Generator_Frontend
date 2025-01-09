import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Delete, Share, Download } from '@mui/icons-material'

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
  qrCode: string
  title: string
  handleDownload: (url: string) => void
  handleDelete: (id: string) => void
  _id: string
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

const QRCodeCard: React.FC<QRCodeCardProps> = ({
  qrCode,
  title,
  _id,
  handleDownload,
  handleDelete,
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
        <IconButton
          onClick={() => handleDelete(_id)}
          icon={<Delete sx={{ color: 'white' }} />}
          disabled={!qrCode}
        />
        <IconButton
          onClick={() => {}}
          icon={<Share sx={{ color: 'white' }} />}
          disabled={!qrCode}
        />
        <IconButton
          onClick={() => handleDownload(qrCode)}
          icon={<Download sx={{ color: 'white' }} />}
          disabled={!qrCode}
        />
      </Box>
    </QRCard>
  )
}

export default QRCodeCard
