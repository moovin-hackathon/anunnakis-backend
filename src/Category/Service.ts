import { CategoryRepository } from './Repository'
import { ItemListModel } from '../Model'
import { ProductEntity } from '../Shared/Entity'
import { Filter } from '../Product/Repository'

export class Service {
  public constructor (
    readonly categoryRepository: CategoryRepository
  ) {
  }

  public async getAll (): Promise<ItemListModel<ProductEntity>> {
    return this.categoryRepository.getAll()
  }

  public async getMostAccess (filters: Filter): Promise<any> {
    return this.categoryRepository.getMostAccess(filters)
  }

  public async getLeastAccess (filters: Filter): Promise<any> {
    return this.categoryRepository.getLeastAccess(filters)
  }
}