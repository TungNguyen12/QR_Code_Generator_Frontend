import React from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Download, Save, Share } from '@mui/icons-material'
import sample_qr from '../assets/images/sample_qr.png'
import { StyledButton, QRCard } from './ui/StyledComponents'
interface QRCodeDisplayProps {
  qrCode: string | null
  title: string
  handleDownload: () => void
}

const QRCodeImage = styled('img')({
  maxWidth: '50%',
  borderRadius: '10px',
  border: `4px solid rgb(107, 9, 255)`,
})

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  qrCode,
  title,
  handleDownload,
}) => {
  return (
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
        {qrCode ? title : 'QR code will show here'}
      </Typography>
      <QRCodeImage
        src={qrCode ? qrCode : sample_qr}
        alt={qrCode ? 'Generated QR Code' : 'Sample QR'}
        sx={{ opacity: qrCode ? 1 : 0.25 }}
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
  )
}

export default QRCodeDisplay
