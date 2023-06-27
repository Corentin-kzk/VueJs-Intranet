import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import type { APIError, User } from './users.types'

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    Accept: 'Content-Type',
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const apiError = error.response.data as APIError
      return Promise.reject(apiError)
    }
    return Promise.reject(error)
  }
)

export async function fetchAll(): Promise<User[]> {
  const response: AxiosResponse = await apiClient.get('/collaborateurs')
  return response.data
}
