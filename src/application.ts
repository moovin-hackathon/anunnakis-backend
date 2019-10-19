import * as express from 'express'
import * as cors from 'cors'
import * as dotenv from 'dotenv'
import { ItemDetail } from './Response'
import { connectToDatabase } from './Middleware'

(async () => {
  dotenv.config()

  const application = express()

  application.use(express.json())
  application.use(express.urlencoded({ extended: false }))
  application.use(cors())
  application.use(connectToDatabase)

  application.get('/status', (request, response, next) => {
    next(new ItemDetail())
  })

  application.set('port', process.env.APP_PORT || 3000)

  application.listen(application.get('port'), () => {
    console.log('App is running at http://localhost:%d in %s mode', application.get('port'), application.get('env'))
  })
})()