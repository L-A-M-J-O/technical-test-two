import { GenericRepository } from '@/modules/core/data/repository/GenericRepository'

export class GenericUseCase<T> {
  constructor(private repository: GenericRepository<T>) {}

  async getAll(): Promise<T[]> {
    return await this.repository.getAll()
  }

  async getById(id: string | number): Promise<T> {
    return await this.repository.getById(id.toString())
  }

  async add(entity: T): Promise<T> {
    return await this.repository.create(entity)
  }

  async updateById(id: string | number, entity: T): Promise<T> {
    return await this.repository.update(id.toString(), entity)
  }

  async delete(id: string | number): Promise<void> {
    await this.repository.delete(id.toString())
  }
}
