export class NotificationEntity {
  public id: string

  public identifier: string

  public type: NotificationType

  public code: string

  public message: string

  public createdAt: Date

  public viewed: boolean
}

export enum NotificationType {
  VARIATION = 'VARIATION'
}