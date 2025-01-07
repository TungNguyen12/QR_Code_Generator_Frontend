import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QRCodeType } from '../../types/qrcode'

interface QRCodeState {
  qrCodes: QRCodeType[]
}

const initialState: QRCodeState = {
  qrCodes: [],
}

const qrCodeSlice = createSlice({
  name: 'qrCode',
  initialState,
  reducers: {
    setQRCodes: (state, action: PayloadAction<QRCodeType[]>) => {
      state.qrCodes = action.payload
    },
  },
})

export const { setQRCodes } = qrCodeSlice.actions
export default qrCodeSlice.reducer
