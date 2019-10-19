import { VariationEntity } from './Variation'

export class ProductEntity {
  public id: string

  public title: string

  public collatorCode: string

  public category: string

  public variations: VariationEntity[]
}
