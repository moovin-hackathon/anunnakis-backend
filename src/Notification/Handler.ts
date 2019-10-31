import { NextFunction, Request, Response } from 'express'
import { NotificationRepository } from './Repository'
import { Service } from './Service'
import { ItemDetail, ItemList } from '../Response'
import { Validator } from './Validator'
import { NotificationEntity } from '../Shared/Entity'

export class Handler {
  public constructor () {
    this.getAll = this.getAll.bind(this)
    this.post = this.post.bind(this)
    this.putViewed = this.putViewed.bind(this)
  }

  public async getAll(request: Request, response: Response, next: NextFunction) {
    const notificationRepository: NotificationRepository = new NotificationRepository(request['models'])
    const service: Service = new Service(notificationRepository)

    try {
      const result = await service.getAll(request.query)

      next(new ItemList(result.items.map(item => this.formatNotification(item)), result.total))
    } catch (e) {
      console.error(e)
      next(e)
    }
  }

  public async post (request: Request, response: Response, next: NextFunction) {
    const notificationRepository: NotificationRepository = new NotificationRepository(request['models'])
    const validator: Validator = new Validator()
    const service: Service = new Service(notificationRepository, validator)

    try {
      const notification = await service.post(request.body)

      next(new ItemDetail(this.formatNotification(notification)))
    } catch (e) {
      console.error(e)
      next(e)
    }
  }

  public async putViewed (request: Request, response: Response, next: NextFunction) {
    const notificationRepository: NotificationRepository = new NotificationRepository(request['models'])
    const validator: Validator = new Validator()
    const service: Service = new Service(notificationRepository, validator)

    try {
      const notification = await service.putViewed(request.params.id)

      next(new ItemDetail(this.formatNotification(notification)))
    } catch (e) {
      console.error(e)
      next(e)
    }
  }

  private formatNotification (notification: NotificationEntity) {
    return notification
  }
}
