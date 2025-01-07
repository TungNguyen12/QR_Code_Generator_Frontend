import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '../../utils/api'
import { getHistoryAsync } from './historySlice'
import { Credentials } from '../../types/credentials'

interface AuthState {
  token: string | null
}

// Initial State
const initialState: AuthState = {
  token: null,
}

export const loginAsync = createAsyncThunk<
  AuthState,
  Credentials,
  { rejectValue: string }
>('loginAsync', async ({ email, password }, { rejectWithValue, dispatch }) => {
  try {
    const response = await api.post(`/auth/login`, {
      email,
      password,
    })
    const jwtToken = response.data.access_token as string
    console.log(jwtToken)

    dispatch(getHistoryAsync(jwtToken))

    const result = {
      token: jwtToken,
    }
    return result
  } catch (e) {
    const error = e as Error
    return rejectWithValue(error.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.token = action.payload.token
    })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
