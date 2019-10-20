import { NextFunction, Request, Response } from 'express'
import { ProductRepository } from './Repository'
import { Service } from './Service'
import { ItemDetail, ItemList } from '../Response'
import { ProductEntity, VariationEntity } from '../Shared/Entity'

export class Handler {
  public constructor () {
    this.getAll = this.getAll.bind(this)
    this.get = this.get.bind(this)
  }

  public async getAll(request: Request, response: Response, next: NextFunction) {
    const productRepository: ProductRepository = new ProductRepository(request['models'])
    const service: Service = new Service(productRepository)

    try {
      const result = await service.getAll(request.query)

      next(new ItemList(result.items.map(item => this.formatProduct(item)), result.total))
    } catch (e) {
      console.error(e)
      next(e)
    }
  }

  public async get (request: Request, response: Response, next: NextFunction) {
    const productRepository: ProductRepository = new ProductRepository(request['models'])
    const service: Service = new Service(productRepository)

    try {
      const product = await service.get(request.params.id)

      next(new ItemDetail(this.formatProduct(product)))
    } catch (e) {
      console.error(e)
      next(e)
    }
  }

  private formatProduct(product: ProductEntity) {
    return product
  }

  private formatVariation(variation: VariationEntity) {
    return variation
  }
}
