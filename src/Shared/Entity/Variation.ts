import { ProductEntity } from './Product'

export class VariationEntity {
  public id: string

  public sku: string

  public images: string

  public previousPrice: number

  public currentPrice: number

  public stockQuantity: number

  public uri: string

  public access: number

  public sale: number

  public color: string

  public grid: string

  public gridType: VariationGridType

  public product: ProductEntity

  public static build (data): VariationEntity {
    const entity = new VariationEntity()
    entity.id = data.id
    entity.sku = data.sku
    entity.images = data.images
    entity.previousPrice = data.previousPrice
    entity.currentPrice = data.currentPrice
    entity.stockQuantity = data.stockQuantity
    entity.uri = data.uri
    entity.access = data.access
    entity.sale = data.sale
    entity.color = data.color
    entity.grid = data.grid
    entity.gridType = VariationGridType[data.gridType.toUpperCase()]

    if (data.product) {
      entity.product = ProductEntity.build(data.product)
    }

    return entity
  }
}

export enum VariationGridType {
  SIZE = 'SIZE',
  FLAVOR = 'FLAVOR',
  VOLTAGE = 'VOLTAGE'
}