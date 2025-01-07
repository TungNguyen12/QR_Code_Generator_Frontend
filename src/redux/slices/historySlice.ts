import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { QRCode } from '../../types/qrcode'
import api from '../../utils/api'

interface History {
  qrCodes: QRCode[]
}

// Initial State
const initialState: History = {
  qrCodes: [],
}

export const getHistoryAsync = createAsyncThunk<
  History,
  string,
  { rejectValue: string }
>('getHistoryAsync', async (token, { rejectWithValue }) => {
  try {
    const response = await api.get(`/qrcodes/my_qrcodes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const qrCodes = response.data
    console.log(response)
    return qrCodes as History
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

// Slice
const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    clearHistoryLogout: (state) => {
      state = { ...state, qrCodes: [] }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHistoryAsync.fulfilled, (state, action) => {
      state.qrCodes = action.payload.qrCodes
    })
  },
})

// Actions
export const { clearHistoryLogout } = historySlice.actions

// Reducer
// const historyReducer = historySlice.reducer
export default historySlice.reducer
