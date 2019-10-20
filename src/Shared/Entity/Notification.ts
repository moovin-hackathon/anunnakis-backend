export class NotificationEntity {
  public id: string

  public identifier: string

  public type: NotificationType

  public code: string

  public message: string

  public createdAt: Date

  public viewed: boolean

  public static build (data): NotificationEntity {
    const entity = new NotificationEntity()
    entity.id = data.id
    entity.identifier = data.identifier
    entity.type = NotificationType[data.type.toUpperCase()]
    entity.code = data.code
    entity.message = data.message
    entity.createdAt = data.createdAt
    entity.viewed = data.viewed

    return entity
  }
}

export enum NotificationType {
  VARIATION = 'VARIATION'
}