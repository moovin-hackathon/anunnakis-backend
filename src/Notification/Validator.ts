import { Document, model, Schema } from 'mongoose'
import { ErrorFactory } from '../Factory'
import { PostNotification } from './Service'
import { NotificationType, VariationGridType } from '../Shared/Entity'

export interface IPostNotificationModel extends PostNotification, Document {
}

export class Validator {
  readonly postSchema: Schema

  public constructor () {
    this.postSchema = new Schema({
      identifier: {
        required: true,
        type: String
      },
      type: {
        type: NotificationType,
        required: true,
        validate: value => {
          if (value && NotificationType[value.toUpperCase()] !== undefined) {
            return true
          }

          return false
        }
      },
      code: {
        type: String,
        required: true
      },
      message: String
    })
  }

  public async post (payload: PostNotification): Promise<void> {
    let Post
    try {
      Post = model<IPostNotificationModel>('PostNotification')
    } catch (e) {
      Post = model<IPostNotificationModel>('PostNotification', this.postSchema)
    }

    try {
      await new Post(payload).validate()
    } catch (payloadError) {
      throw ErrorFactory.getUnprocessableEntityFromValidationError(payloadError)
    }
  }
}
