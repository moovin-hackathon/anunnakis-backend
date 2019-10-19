export class AccountEntity {

  public id: string

  public name: string

  public static build (data): AccountEntity {
    const entity = new AccountEntity()
    entity.id = data.id
    entity.name = data.name

    return entity
  }
}
