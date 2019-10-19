import { VariationEntity } from './Variation'

export class CustomerEntity {
  public id: string

  public name: string

  public email: string

  public variations: VariationEntity[]
}
