import axios, { AxiosInstance } from 'axios'
import type { IHttpRequestService } from './interfaces/http.repository'

export class AxiosHttpRequestService implements IHttpRequestService {
  private client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL })
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url)
    return response.data
  }

  async post<T>(url: string, payload: any): Promise<T> {
    const response = await this.client.post<T>(url, payload)
    return response.data
  }

  async put<T>(url: string, payload: any): Promise<T> {
    const response = await this.client.put<T>(url, payload)
    return response.data
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url)
    return response.data
  }
}
