import { ProductEntity } from './Product'
import { VariationSaleEntity } from './VariationSale'
import { VariationAccessEntity } from './VariationAccess'

export class VariationEntity {
  public id: string

  public sku: string

  public images: string

  public previousPrice: number

  public currentPrice: number

  public stockQuantity: number

  public uri: string

  public color: string

  public grid: string

  public gridType: VariationGridType

  public product: ProductEntity

  public sales: VariationSaleEntity[]

  public accesses: VariationAccessEntity[]

  public static build (data): VariationEntity {
    const entity = new VariationEntity()
    entity.id = data.id
    entity.sku = data.sku
    entity.images = data.images
    entity.previousPrice = data.previousPrice
    entity.currentPrice = data.currentPrice
    entity.stockQuantity = data.stockQuantity
    entity.uri = data.uri
    entity.color = data.color
    entity.grid = data.grid

    if (data.gridType) {
      entity.gridType = VariationGridType[data.gridType.toUpperCase()]
    }

    if (data.product) {
      entity.product = ProductEntity.build(data.product)
    }

    if (data.sales) {
      entity.sales = data.sales.map(VariationSaleEntity.build)
    }

    if (data.accesses) {
      entity.accesses = data.accesses.map(VariationAccessEntity.build)
    }

    return entity
  }
}

export enum VariationGridType {
  SIZE = 'SIZE',
  FLAVOR = 'FLAVOR',
  VOLTAGE = 'VOLTAGE'
}