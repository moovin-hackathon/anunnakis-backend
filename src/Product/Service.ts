import { Filter, ProductRepository } from './Repository'
import { ItemListModel } from '../Model'
import { ProductEntity, VariationEntity, VariationGridType } from '../Shared/Entity'
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

  public async getNeedBuy (filter: Filter): Promise<ItemListModel<ProductEntity>> {
    return this.productRepository.getNeedBuy(filter)
  }
  public async getNeedSell (filter: Filter): Promise<ItemListModel<ProductEntity>> {
    return this.productRepository.getNeedSell(filter)
  }

  public async get (id: string): Promise<ProductEntity> {
    return this.productRepository.get(id)
  }

  public async post (body: ProductPayload): Promise<ProductEntity> {
    await this.validator.post(body)

    const product: ProductEntity = ProductEntity.build(body)

    return this.productRepository.create(product)
  }

  public async putVariations (id: string, body: VariationPayload[]): Promise<ProductEntity> {
    await this.validator.putVariations({ variations: body })

    const product: ProductEntity = await this.get(id)

    const variations: VariationEntity[] = []

    const idsToDelete = product.variations.filter(
      variation => body.find(bodyVariation => bodyVariation.sku == variation.sku) === undefined
    ).map(variation => variation.id)

    for (const variation of body) {

      const oldVariation = product.variations.find(oldVariation => oldVariation.sku === variation.sku)
      if (oldVariation !== undefined) {
        variation['id'] = oldVariation.id
      }

      variations.push(VariationEntity.build(variation))
    }

    product.variations = variations

    return this.productRepository.update(product, idsToDelete)
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