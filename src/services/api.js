import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export function getApiError(error) {
  if (error.response) {
    return (
      error.response.data?.detail ||
      `Server error: ${error.response.status}`
    )
  }

  if (error.request) {
    return 'Could not reach the backend. Check whether the API server is running.'
  }

  return error.message || 'An unexpected error occurred.'
}

export default api