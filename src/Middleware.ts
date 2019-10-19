import { NextFunction, Request, Response } from 'express'
import { Sequelize } from 'sequelize-typescript'
import * as path from 'path'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

const modelsFolder = path.join(__dirname, '/Shared/Database')
const models = {}

dotenv.config()

export const connectToDatabase = (request: Request, response: Response, next: NextFunction) => {

  const database = new Sequelize({
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
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

    models[model.name] = model
  })

  Object.values(models)
  // @ts-ignore
    .filter(m => m.associate)
    // @ts-ignore
    .forEach(m => m.associate(models))

  request['models'] = database.models

  next()
}