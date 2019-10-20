import { Filter, ProductRepository } from './Repository'
import { ItemListModel } from '../Model'
import { ProductEntity, VariationGridType } from '../Shared/Entity'
import { Validator } from './Validator'

export class Service {
  public constructor (
    readonly productRepository: ProductRepository,
    readonly validator?: Validator
  ) {
  }

  public async getAll (filters: Filter): Promise<ItemListModel<ProductEntity>> {
    return this.productRepository.getAll(filters)
  }

  public async getMostSales (filters: Filter): Promise<ItemListModel<ProductEntity>> {
    return this.productRepository.getMostSales(filters)
  }

  public async getLeastSales (filters: Filter): Promise<ItemListModel<ProductEntity>> {
    return this.productRepository.getLeastSales(filters)
  }

  public async getMostAccess (filters: Filter): Promise<ItemListModel<ProductEntity>> {
    return this.productRepository.getMostAccess(filters)
  }

  public async getLeastAccess (filters: Filter): Promise<ItemListModel<ProductEntity>> {
    return this.productRepository.getLeastAccess(filters)
  }

  public async get (id: string): Promise<ProductEntity> {
    return this.productRepository.get(id)
  }

  public async post (body: ProductPayload): Promise<ProductEntity> {
    await this.validator.post(body)

    const product: ProductEntity = ProductEntity.build(body)

    return this.productRepository.create(product)
  }
}

export interface ProductPayload {
  title: string
  collator: string
  category: string
  variations: VariationPayload[]
}

export interface VariationPayload {
  sku: string
  images: string
  previousPrice: number
  currentPrice: number
  stockQuantity: number
  uri: string
  color: string
  grid: string
  gridType: VariationGridType
}