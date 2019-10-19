import { Request, Response, NextFunction } from 'express'
import { ItemList, SuccessContract, ItemDetail } from '../Response'

export class SuccessHandler {
  public constructor () {
    this.success = this.success.bind(this)
  }

  public success (result: SuccessContract, request: Request, response: Response, next: NextFunction) {

    if (result instanceof ItemList) {

      response
        .status(200)
        .json({
          items: result.items,
          total: result.total
        })

    } else if (result instanceof ItemDetail) {

      if (result.items === null) {
        response
          .status(204)
          .send()
        return
      }

      response
        .status(result.newItem ? 201 : 200)
        .json(result.items)

    } else {

      next(result)
    }
  }
}