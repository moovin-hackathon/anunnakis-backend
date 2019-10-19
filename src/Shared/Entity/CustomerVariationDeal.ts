import { CustomerEntity } from './Customer'
import { VariationEntity } from './Variation'

export class CustomerVariationDealEntity {
  public id: string

  public variationId: string

  public customerId: string

  public variationPrice: number

  public dealPrice: number

  public status: CustomerVariationDealStatus

  public dealUri: string

  public dealUriExpires: Date

  public customer: CustomerEntity

  public variation: VariationEntity

  public static build (data): CustomerVariationDealEntity {
    const entity = new CustomerVariationDealEntity()
    entity.id = data.id
    entity.variationId = data.variationId
    entity.customerId = data.customerId
    entity.variationPrice = data.variationPrice
    entity.dealPrice = data.dealPrice
    entity.status = data.status
    entity.dealUri = data.dealUri
    entity.dealUriExpires = data.dealUriExpires

    if (data.customer) {
      entity.customer = CustomerEntity.build(data.customer)
    }

    if (data.variation) {
      entity.variation = VariationEntity.build(data.variation)
    }

    return entity
  }
}

export enum CustomerVariationDealStatus {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED'
}
