import { NextFunction, Request, Response } from 'express'
import { CategoryRepository } from './Repository'
import { Service } from './Service'
import { ItemList } from '../Response'

export class Handler {
  public constructor () {
    this.getAll = this.getAll.bind(this)
  }

  public async getAll (request: Request, response: Response, next: NextFunction) {
    const categoryRepository: CategoryRepository = new CategoryRepository(request['models'])
    const service: Service = new Service(categoryRepository)

    try {
      const result = await service.getAll()

      next(new ItemList(result.items, result.total))
    } catch (e) {
      console.error(e)
      next(e)
    }
  }
}
