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
}