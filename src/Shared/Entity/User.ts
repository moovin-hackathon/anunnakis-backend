import { AccountEntity } from './Account'

export class UserEntity {
  public id: string

  public name: string

  public email: string

  public password: string

  public token: string

  public tokenExpires: Date

  public accountId: string

  public account: AccountEntity

  public static build (data): UserEntity {
    const entity = new UserEntity()
    entity.id = data.id
    entity.name = data.name
    entity.email = data.email
    entity.password = data.password
    entity.token = data.token
    entity.tokenExpires = data.tokenExpires
    entity.accountId = data.accountId

    if (data.account) {
      entity.account = AccountEntity.build(data.account)
    }

    return entity
  }
}