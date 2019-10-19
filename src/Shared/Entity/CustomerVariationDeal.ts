import { CustomerEntity } from './Customer'

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
}

export enum CustomerVariationDealStatus {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED'
}
