import axios from 'axios'
import { BACKEND_API_URL } from './common'

const api = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
