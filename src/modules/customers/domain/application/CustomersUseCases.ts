import type { ICustomer } from '@/modules/customers/domain/core/CustomersEntity'
import type { CustomsRepository } from '@/modules/customers/data/repository/CustomersRepository'
import { GenericUseCase } from '@/modules/core/domain/application/useCases/GenericUseCase'

export class CustomsUseCases extends GenericUseCase<ICustomer> {
  constructor(protected customsRepository: CustomsRepository) {
    super(customsRepository)
  }
}
