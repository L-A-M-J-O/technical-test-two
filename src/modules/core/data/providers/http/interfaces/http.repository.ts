export interface IHttpRequestService {
  get<T>(url: string): Promise<T>
  post<T>(url: string, payload: any): Promise<T>
  put<T>(url: string, payload: any): Promise<T>
  delete<T>(url: string): Promise<T>
}