import type { IHttpRequestService } from '@/modules/core/data/providers/http/interfaces/http.repository'
import { AxiosHttpRequestService } from '@/modules/core/data/providers/http/AxiosHttpRequestService'

export class GenericRepository<T> {
  protected client: IHttpRequestService
  protected baseUrl: string

  constructor(baseUrl: string, client?: IHttpRequestService) {
    this.baseUrl = baseUrl
    this.client = client ?? new AxiosHttpRequestService(baseUrl)
  }

  async getAll(): Promise<T[]> {
    return this.client.get<T[]>(`${this.baseUrl}`)
  }

  async getById(id: string): Promise<T> {
    return this.client.get<T>(`${this.baseUrl}/${id}`)
  }

  async create(payload: T): Promise<T> {
    return this.client.post<T>(this.baseUrl, payload)
  }

  async update(id: string, payload: T): Promise<T> {
    return this.client.put<T>(`${this.baseUrl}/${id}`, payload)
  }

  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`${this.baseUrl}/${id}`)
  }
}
