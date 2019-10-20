import { Filter, ManagerRepository } from './Repository'
import { ItemListModel } from '../Model'
import { ProductEntity } from '../Shared/Entity'

export class Service {
  public constructor (
    readonly productRepository: ManagerRepository
  ) {
  }

  public async getAll (filters: Filter): Promise<ItemListModel<ProductEntity>> {
    return this.productRepository.getAll(filters)
  }
}