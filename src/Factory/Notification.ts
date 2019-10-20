import { NotificationEntity, NotificationType } from '../Shared/Entity'
import { NotificationRepository } from '../Notification/Repository'

export class NotificationFactory {

  public static async create (models, identifier: string, type: NotificationType, code: string, message?: string) {

    const notification = NotificationEntity.build({
      identifier,
      type,
      code,
      message
    })

    try {
      await new NotificationRepository(models).create(notification)
    } catch (e) {

    }
  }
}