export class VariationSaleEntity {
  public id: string

  public variationId: string

  public static build (data): VariationSaleEntity {
    const entity = new VariationSaleEntity()
    entity.id = data.id
    entity.variationId = data.variationId

    return entity
  }
}