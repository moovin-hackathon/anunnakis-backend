import { Filter, ProductRepository } from './Repository'
import { ItemListModel } from '../Model'
import { ProductEntity } from '../Shared/Entity'

export class Service {
  public constructor (
    readonly productRepository: ProductRepository,
  ) {
  }

  public async getAll (filters: Filter): Promise<ItemListModel<ProductEntity>> {
    return this.productRepository.getAll(filters)
  }

  public async get (id: string): Promise<ProductEntity> {
    return this.productRepository.get(id)
  }
}
