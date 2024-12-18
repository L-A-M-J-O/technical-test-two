import { AxiosHttpRequestService } from '@/modules/core/data/providers/http/AxiosHttpRequestService'
import { NetworkConstants } from '@/modules/core/utilities/NetworkConstants'
import { GenericRepository } from '@/modules/core/data/repository/GenericRepository'
import type { ICustomer } from '@/modules/customers/domain/core/CustomersEntity'

const { BASE_API } = NetworkConstants
const baseUrl = `${BASE_API}/customers`

export class CustomsRepository extends GenericRepository<ICustomer> {
  constructor() {
    super(baseUrl, new AxiosHttpRequestService(baseUrl))
  }
}
