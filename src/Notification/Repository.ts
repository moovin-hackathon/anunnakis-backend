import { WhereOptions } from 'sequelize'
import { IFindOptions } from 'sequelize-typescript'
import { ItemListModel } from '../Model'
import { DataNotFound } from '../Response'
import { FilterDefault, RepositoryContract } from '../Repository'
import { NotificationEntity } from '../Shared/Entity'
import { ErrorFactory } from '../Factory'

export class NotificationRepository extends RepositoryContract {
  readonly Notification

  public constructor (readonly models) {
    super()

    this.Notification = this.models.Notification
  }

  public async getAll (filter: Filter): Promise<ItemListModel<NotificationEntity>> {

    const where: WhereOptions<NotificationEntity> = {}

    if (filter.hasOwnProperty('viewed')) {
      where.viewed = filter.viewed == 'true' ? 1 : 0
    }

    const options: IFindOptions<NotificationEntity> = {
      order: [
        ['createdAt', 'DESC']
      ],
      // @ts-ignore
      where
    }

    const total = await this.Notification.count({
      // @ts-ignore
      where
    })

    this.applyPaginator(filter, options)

    const items = (await this.Notification.findAll(options)).map(NotificationEntity.build)

    return {
      items,
      total
    }
  }

  public async get (id: string): Promise<NotificationEntity> {

    const options: IFindOptions<NotificationEntity> = {
      where: {
        id
      }
    }

    const notification = await this.Notification.findOne(options)

    if (!notification) {
      throw new DataNotFound()
    }

    return NotificationEntity.build(notification)
  }

  public async create (notification: NotificationEntity): Promise<NotificationEntity> {
    const transaction = await this.Notification.sequelize.transaction()

    try {
      const notificationSaved = await new this.Notification(notification).save({
        transaction
      })

      notification.id = notificationSaved.id

      await transaction.commit()

    } catch (e) {

      await transaction.rollback()

      let error = e

      try {
        error = ErrorFactory.getFromSequelizeError(e)
      } catch (e) {
      }

      throw error
    }

    return this.get(notification.id)
  }

  public async update (notification: NotificationEntity): Promise<NotificationEntity> {
    const transaction = await this.Notification.sequelize.transaction()

    try {
      await this.Notification.insertOrUpdate(notification, {
        transaction
      })

      await transaction.commit()

    } catch (e) {

      await transaction.rollback()

      let error = e

      try {
        error = ErrorFactory.getFromSequelizeError(e)
      } catch (e) {
      }

      throw error
    }

    return this.get(notification.id)
  }
}

export interface Filter extends FilterDefault {
  viewed?: string
}
