import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import type { APIError, APISuccessInserted, User } from './users.types'

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

export async function fetchOne(id: string): Promise<User> {
  const response: AxiosResponse = await apiClient.get(`/collaborateur/${id}`)
  return response.data
}

export async function create(user: Partial<User>): Promise<APISuccessInserted> {
  const response: AxiosResponse = await apiClient.post('/collaborateurs', user)
  return response.data
}

export async function update(user: Partial<User>): Promise<APISuccessInserted> {
  const response: AxiosResponse = await apiClient.put(`/collaborateur/${user.id}`, user)
  return response.data
}

export async function remove(id: string): Promise<APISuccessInserted> {
  const response: AxiosResponse = await apiClient.delete(`/collaborateur/${id}`)
  return response.data
}