import { VariationEntity } from './Variation'

export class ProductEntity {
  public id: string

  public title: string

  public collatorCode: string

  public category: string

  public variations: VariationEntity[]

  public static build (data): ProductEntity {
    const entity = new ProductEntity()
    entity.id = data.id
    entity.title = data.title
    entity.collatorCode = data.collatorCode
    entity.category = data.category

    if (data.variations) {
      entity.variations = data.variations.map(VariationEntity.build)
    }

    return entity
  }
}
