import React, { useRef } from 'react'
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

interface IconButtonProps {
  onClick: () => void
  icon: React.ReactNode
  disabled: boolean
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, disabled }) => {
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

interface QRCodeCardProps {
  qrCode: string
  title?: string
  handleDownload: (url: string, filename: string) => void
  handleDelete: (id: string) => void
  _id: string
  background_color: string
  foreground_color: string
  created_at: string
}

const QRCodeCard: React.FC<QRCodeCardProps> = ({
  qrCode,
  title,
  _id,
  handleDownload,
  handleDelete,
  background_color,
  foreground_color,
  created_at,
}) => {
  const qrCodeRef = useRef<SVGSVGElement>(null)

  const handleDownloadImage = () => {
    if (qrCodeRef.current) {
      const svg = qrCodeRef.current
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (ctx) {
          const img = new Image()
          img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
            const pngUrl = canvas.toDataURL('image/png')
            handleDownload(pngUrl, title ? title : 'Unknown' + '.png')
          }
          img.src =
            'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgData)
        } else {
          console.error('Canvas context is null')
        }
      }
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
        {title ? title : 'Unknown'}
      </Typography>

      <QRCodeSVG
        value={qrCode ? qrCode : 'https://www.google.com/'}
        size={100}
        bgColor={background_color}
        fgColor={foreground_color}
        ref={qrCodeRef}
      />
      <Typography>{created_at}</Typography>

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
          onClick={handleDownloadImage}
          icon={<Download sx={{ color: 'white' }} />}
          disabled={!qrCode}
        />
      </Box>
    </QRCard>
  )
}

export default QRCodeCard
