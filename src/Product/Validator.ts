import { Document, model, Schema } from 'mongoose'
import { ErrorFactory } from '../Factory'
import { ProductPayload, VariationPayload } from './Service'
import { VariationGridType } from '../Shared/Entity'

export interface IPostProductModel extends ProductPayload, Document {
}

export interface IPutVariationModel extends VariationPayload, Document {
}

export class Validator {
  readonly postSchema: Schema
  readonly putVariationSchema: Schema

  public constructor () {
    this.postSchema = new Schema({
      title: {
        required: true,
        type: String
      },
      collatorCode: {
        required: true,
        type: String
      },
      category: {
        required: true,
        type: String
      },
      variations: {
        type: [
          {
            sku: {
              required: true,
              type: String
            },
            images: {
              required: true,
              type: [String]
            },
            previousPrice: {
              required: true,
              type: Number
            },
            currentPrice: {
              required: true,
              type: Number
            },
            stockQuantity: {
              required: true,
              type: Number
            },
            uri: {
              required: true,
              type: String
            },
            color: {
              type: String
            },
            grid: {
              type: String
            },
            gridType: {
              type: String,
              validate: function (gridType) {
                if (gridType && VariationGridType[gridType.toUpperCase()] !== undefined) {
                  return true
                }

                return false
              }
            }
          }
        ],
        validate: function (variations) {
          if (variations.length) {
            return true
          }

          return false
        }
      }
    })
    this.putVariationSchema = new Schema({
      variations: {
        type: [
          {
            sku: {
              required: true,
              type: String
            },
            images: {
              required: true,
              type: [String]
            },
            previousPrice: {
              required: true,
              type: Number
            },
            currentPrice: {
              required: true,
              type: Number
            },
            stockQuantity: {
              required: true,
              type: Number
            },
            uri: {
              required: true,
              type: String
            },
            color: {
              type: String
            },
            grid: {
              type: String
            },
            gridType: {
              type: String,
              validate: function (gridType) {
                if (gridType && VariationGridType[gridType.toUpperCase()] !== undefined) {
                  return true
                }

                return false
              }
            }
          }
        ],
        validate: function (variations) {
          if (variations.length) {
            return true
          }

          return false
        }
      }
    })
  }

  public async post (payload: ProductPayload): Promise<void> {
    let Post
    try {
      Post = model<IPostProductModel>('PostProduct')
    } catch (e) {
      Post = model<IPostProductModel>('PostProduct', this.postSchema)
    }

    try {
      await new Post(payload).validate()
    } catch (payloadError) {
      throw ErrorFactory.getUnprocessableEntityFromValidationError(payloadError)
    }
  }

  public async putVariations (payload: { variations: VariationPayload[] }): Promise<void> {
    let PutVariation
    try {
      PutVariation = model<IPutVariationModel>('PutVariation')
    } catch (e) {
      PutVariation = model<IPutVariationModel>('PutVariation', this.putVariationSchema)
    }

    try {
      await new PutVariation(payload).validate()
    } catch (payloadError) {
      throw ErrorFactory.getUnprocessableEntityFromValidationError(payloadError)
    }
  }
}
