import { ref } from 'vue'
import { GenericUseCase } from '@/modules/core/domain/application/useCases/GenericUseCase'
import { useCustomersResponse } from '@/modules/customers/presentation/store/CustomersStore'
import type { ICustomer } from '@/modules/customers/domain/core/CustomersEntity'

export class CustomersBloc {
  customers = ref<ICustomer[]>([])
  error = ref<string | null>(null)

  private useCase: GenericUseCase<ICustomer>
  private store = useCustomersResponse()

  constructor(useCase: GenericUseCase<ICustomer>) {
    this.useCase = useCase
  }

  async getAllCustomers(): Promise<void> {
    this.store.toggleLoading()
    this.error.value = null

    try {
      const response = await this.useCase.getAll()
      this.store.setResponse({ collection: response })
      this.customers.value = response
    } catch (e) {
      this.error.value = e instanceof Error ? e.message : 'Error desconocido'
      console.error('Error al cargar clientes:', e)
    } finally {
      this.store.toggleLoading()
    }
  }

  async getCustomerById(id: string): Promise<void> {
    this.store.toggleLoading()

    try {
      const customer = await this.useCase.getById(id)
      this.store.setSelected(customer)
    } catch (e) {
      console.error('Error al obtener el cliente:', e)
    } finally {
      this.store.toggleLoading()
    }
  }
}
