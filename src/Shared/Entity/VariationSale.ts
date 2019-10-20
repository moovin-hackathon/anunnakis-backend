export class VariationSaleEntity {
  public id: string

  public variationId: string

  public createdAt: Date

  public static build (data): VariationSaleEntity {
    const entity = new VariationSaleEntity()
    entity.id = data.id
    entity.variationId = data.variationId
    entity.createdAt = data.createdAt

    return entity
  }
}