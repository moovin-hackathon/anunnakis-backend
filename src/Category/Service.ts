import { CategoryRepository } from './Repository'
import { ItemListModel } from '../Model'
import { ProductEntity } from '../Shared/Entity'

export class Service {
  public constructor (
    readonly productRepository: CategoryRepository
  ) {
  }

  public async getAll (): Promise<ItemListModel<ProductEntity>> {
    return this.productRepository.getAll()
  }
}