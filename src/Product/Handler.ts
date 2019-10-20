import { NextFunction, Request, Response } from 'express'
import { ProductRepository } from './Repository'
import { Service } from './Service'
import { ItemDetail, ItemList } from '../Response'
import { ProductEntity, VariationEntity } from '../Shared/Entity'
import { Validator } from './Validator'

export class Handler {
  public constructor () {
    this.getAll = this.getAll.bind(this)
    this.get = this.get.bind(this)
    this.post = this.post.bind(this)
    this.putVariations = this.putVariations.bind(this)
    this.getMostSales = this.getMostSales.bind(this)
    this.getLeastSales = this.getLeastSales.bind(this)
    this.getMostAccess = this.getMostAccess.bind(this)
    this.getLeastAccess = this.getLeastAccess.bind(this)
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

  public async getMostSales(request: Request, response: Response, next: NextFunction) {
    const productRepository: ProductRepository = new ProductRepository(request['models'])
    const service: Service = new Service(productRepository)

    try {
      const result = await service.getMostSales(request.query)

      next(new ItemList(result.items.map(item => this.formatProduct(item)), result.total))
    } catch (e) {
      console.error(e)
      next(e)
    }
  }

  public async getLeastSales(request: Request, response: Response, next: NextFunction) {
    const productRepository: ProductRepository = new ProductRepository(request['models'])
    const service: Service = new Service(productRepository)

    try {
      const result = await service.getLeastSales(request.query)

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

  public async post (request: Request, response: Response, next: NextFunction) {
    const productRepository: ProductRepository = new ProductRepository(request['models'])
    const validator: Validator = new Validator()
    const service: Service = new Service(productRepository, validator)

    try {
      const product = await service.post(request.body)

      next(new ItemDetail(this.formatProduct(product)))
    } catch (e) {
      console.error(e)
      next(e)
    }
  }

  public async putVariations (request: Request, response: Response, next: NextFunction) {
    const productRepository: ProductRepository = new ProductRepository(request['models'])
    const validator: Validator = new Validator()
    const service: Service = new Service(productRepository, validator)

    try {
      const product = await service.putVariations(request.params.id, request.body)

      next(new ItemDetail(this.formatProduct(product)))
    } catch (e) {
      console.error(e)
      next(e)
    }
  }

  public async getMostAccess (request: Request, response: Response, next: NextFunction) {
    const productRepository: ProductRepository = new ProductRepository(request['models'])
    const service: Service = new Service(productRepository)

    try {
      const result = await service.getMostAccess(request.query)

      next(new ItemList(result.items.map(item => this.formatProduct(item)), result.total))
    } catch (e) {
      console.error(e)
      next(e)
    }
  }

  public async getLeastAccess (request: Request, response: Response, next: NextFunction) {
    const productRepository: ProductRepository = new ProductRepository(request['models'])
    const service: Service = new Service(productRepository)

    try {
      const result = await service.getLeastAccess(request.query)

      next(new ItemList(result.items.map(item => this.formatProduct(item)), result.total))
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
