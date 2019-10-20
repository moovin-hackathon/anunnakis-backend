import { NextFunction, Request, Response } from 'express'
import { CategoryRepository } from './Repository'
import { Service } from './Service'
import { ItemDetail, ItemList } from '../Response'

export class Handler {
  public constructor () {
    this.getAll = this.getAll.bind(this)
    this.getMostAccess = this.getMostAccess.bind(this)
    this.getLeastAccess = this.getLeastAccess.bind(this)
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

  public async getMostAccess (request: Request, response: Response, next: NextFunction) {
    const categoryRepository: CategoryRepository = new CategoryRepository(request['models'])
    const service: Service = new Service(categoryRepository)

    try {
      const result = await service.getMostAccess(request.query)

      next(new ItemDetail(result))
    } catch (e) {
      console.error(e)
      next(e)
    }
  }

  public async getLeastAccess (request: Request, response: Response, next: NextFunction) {
    const categoryRepository: CategoryRepository = new CategoryRepository(request['models'])
    const service: Service = new Service(categoryRepository)

    try {
      const result = await service.getLeastAccess(request.query)

      next(new ItemDetail(result))
    } catch (e) {
      console.error(e)
      next(e)
    }
  }
}
