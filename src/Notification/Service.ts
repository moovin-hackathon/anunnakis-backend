import { Filter, NotificationRepository } from './Repository'
import { ItemListModel } from '../Model'
import { NotificationEntity, NotificationType } from '../Shared/Entity'
import { Validator } from './Validator'

export class Service {
  public constructor (
    readonly notificationRepository: NotificationRepository,
    readonly validator?: Validator
  ) {
  }

  public async getAll (filters: Filter): Promise<ItemListModel<NotificationEntity>> {
    return this.notificationRepository.getAll(filters)
  }

  public async get (id: string): Promise<NotificationEntity> {
    return this.notificationRepository.get(id)
  }

  public async post (body: PostNotification): Promise<NotificationEntity> {
    await this.validator.post(body)

    const notification: NotificationEntity = NotificationEntity.build(body)

    return this.notificationRepository.create(notification)
  }

  public async putViewed (id: string): Promise<NotificationEntity> {

    const notification: NotificationEntity = await this.get(id)

    notification.viewed = true

    return this.notificationRepository.update(notification)
  }
}

export interface PostNotification {
  identifier: string
  type: string
  code: string
  message?: string
}