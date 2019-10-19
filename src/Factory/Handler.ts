import { ErrorHandler, SuccessHandler } from '../Handler'

export class HandlerFactory {
  public static getErrorHandler () {
    return new ErrorHandler()
  }

  public static getSuccessHandler () {
    return new SuccessHandler()
  }
}