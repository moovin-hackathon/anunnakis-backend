import * as express from 'express'
import * as cors from 'cors'
import * as dotenv from 'dotenv'
import { ItemDetail } from './Response'
import { HandlerFactory } from './Factory'
import { connectToDatabase, connectToDatabaseAuth } from './Middleware'
import { Handler as ProductHandler } from './Product/Handler'
import { Handler as NotificationHandler } from './Notification/Handler'
import { Handler as ManagerHandler } from './Manager/Handler'
import { Handler as CategoryHandler } from './Category/Handler'

(async () => {
  dotenv.config()

  const application = express()

  application.use(express.json())
  application.use(express.urlencoded({ extended: false }))
  application.use(cors())

  application.use(connectToDatabaseAuth)
  application.use(connectToDatabase)

  application.get('/status', (request, response, next) => {
    next(new ItemDetail())
  })

  // With Rules
  application.get('/product/most_access', new ProductHandler().getMostAccess)
  application.get('/product/least_access', new ProductHandler().getLeastAccess)
  application.get('/product/most_sales', new ProductHandler().getMostSales)
  application.get('/product/least_sales', new ProductHandler().getLeastSales)

  application.get('/product/need_buy', new ProductHandler().getNeedBuy)
  application.get('/product/need_sell', new ProductHandler().getNeedSell)

  application.get('/manager', new ManagerHandler().getAll)

  application.get('/notification', new NotificationHandler().getAll)
  application.post('/notification', new NotificationHandler().post)
  application.put('/notification/:id/viewed', new NotificationHandler().putViewed)

  application.get('/product', new ProductHandler().getAll)
  application.post('/product', new ProductHandler().post)
  application.get('/product/:id', new ProductHandler().get)
  application.put('/product/:id/variations', new ProductHandler().putVariations)

  application.get('/category', new CategoryHandler().getAll)
  application.get('/category/most_access', new CategoryHandler().getMostAccess)
  application.get('/category/least_access', new CategoryHandler().getLeastAccess)

  application.use(HandlerFactory.getSuccessHandler().success)
  application.use(HandlerFactory.getErrorHandler().error)
  application.use(HandlerFactory.getErrorHandler().notFound)

  application.set('port', process.env.APP_PORT || 3000)

  application.listen(application.get('port'), () => {
    console.log('App is running at http://localhost:%d in %s mode', application.get('port'), application.get('env'))
  })
})()