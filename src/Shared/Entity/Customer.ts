import { VariationEntity } from './Variation'

export class CustomerEntity {
  public id: string

  public name: string

  public email: string

  public variations: VariationEntity[]

  public static build (data): CustomerEntity {
    const entity = new CustomerEntity()
    entity.id = data.id
    entity.name = data.name
    entity.email = data.email

    if (data.variations) {
      entity.variations = data.variations.map(VariationEntity.build)
    }

    return entity
  }
}
