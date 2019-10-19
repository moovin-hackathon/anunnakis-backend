import { NextFunction, Request, Response } from 'express'
import { Sequelize } from 'sequelize-typescript'
import * as path from 'path'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

const modelsFolder = path.join(__dirname, '/Shared/Database')
const databases = {}
const models = {}

dotenv.config()

export const connectToDatabaseAuth = (request: Request, response: Response, next: NextFunction) => {
  if (databases['auth'] === undefined) {
    const database = new Sequelize({
      database: `${process.env.MYSQL_DATABASE_AUTH}`,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.MYSQL_HOST,
      dialect: 'mysql',
      timezone: 'America/Sao_Paulo',
      native: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })

    fs.readdirSync(modelsFolder).forEach(modelPath => {
      if (modelPath.substr(-3) === 'map') {
        return
      }

      modelPath = path.join(modelsFolder, modelPath)

      let model = require(modelPath)
      model = database.import(modelPath)

      model = model.changeSchema(`${process.env.MYSQL_DATABASE_AUTH}`)
      models[model.name] = model
    })

    Object.values(models)
    // @ts-ignore
      .filter(m => m.associate)
      // @ts-ignore
      .forEach(m => m.associate(models))

    databases['auth'] = database
  }

  request['models'] = databases['auth'].models

  next()
}

export const connectToDatabase = (request: Request, response: Response, next: NextFunction) => {
  if (databases[request.header('Account-Id')] === undefined) {
    const database = new Sequelize({
      database: `${process.env.MYSQL_DATABASE}_${request.header('Account-Id')}`,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.MYSQL_HOST,
      dialect: 'mysql',
      timezone: 'America/Sao_Paulo',
      native: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })

    fs.readdirSync(modelsFolder).forEach(modelPath => {
      if (modelPath.substr(-3) === 'map') {
        return
      }

      modelPath = path.join(modelsFolder, modelPath)

      let model = require(modelPath)
      model = database.import(modelPath)

      model = model.changeSchema(`${process.env.MYSQL_DATABASE}_${request.header('1eg-Account-Id')}`)
      models[model.name] = model
    })

    Object.values(models)
    // @ts-ignore
      .filter(m => m.associate)
      // @ts-ignore
      .forEach(m => m.associate(models))

    databases[request.header('Account-Id')] = database
  }

  request['models'] = databases[request.header('Account-Id')].models

  next()
}