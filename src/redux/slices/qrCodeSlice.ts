import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QRCode } from '../../types/qrcode'

interface QRCodeState {
  qrCodes: QRCode[]
}

const initialState: QRCodeState = {
  qrCodes: [],
}

const qrCodeSlice = createSlice({
  name: 'qrCode',
  initialState,
  reducers: {
    setQRCodes: (state, action: PayloadAction<QRCode[]>) => {
      state.qrCodes = action.payload
    },
  },
})

export const { setQRCodes } = qrCodeSlice.actions
export default qrCodeSlice.reducer
