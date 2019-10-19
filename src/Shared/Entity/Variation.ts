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
}

export enum VariationGridType {
  SIZE = 'SIZE',
  FLAVOR = 'FLAVOR',
  VOLTAGE = 'VOLTAGE'
}