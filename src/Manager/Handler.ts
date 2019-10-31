import { NextFunction, Request, Response } from 'express'
import { ManagerRepository } from './Repository'
import { Service } from './Service'
import { ItemList } from '../Response'

export class Handler {
  public constructor () {
    this.getAll = this.getAll.bind(this)
  }

  public async getAll (request: Request, response: Response, next: NextFunction) {
    const managerRepository: ManagerRepository = new ManagerRepository(request['models'])
    const service: Service = new Service(managerRepository)

    try {
      const result = await service.getAll(request.query)

      next(new ItemList(result.items, result.total))
    } catch (e) {
      console.error(e)
      next(e)
    }
  }
}
