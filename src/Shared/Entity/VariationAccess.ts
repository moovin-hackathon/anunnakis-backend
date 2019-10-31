export class VariationAccessEntity {
  public id: string

  public variationId: string

  public createdAt: Date

  public static build (data): VariationAccessEntity {
    const entity = new VariationAccessEntity()
    entity.id = data.id
    entity.variationId = data.variationId


    return entity
  }
}