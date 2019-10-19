import { DataTypes } from 'sequelize'

export default (sequelize, dataTypes: DataTypes) => {
  const Module = sequelize.define('Module', {
    id: {
      type: dataTypes.UUIDV4,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true
    },
    name: dataTypes.STRING,
    identifier: dataTypes.STRING,
    status: dataTypes.BOOLEAN
  }, {
    tableName: 'module'
  })

  Module.changeSchema = schema => Module.schema(schema, {
    schemaDelimeter: '`.`'
  })

  Module.associate = models => {
    Module.hasMany(models.ModuleConfiguration, {
      foreignKey: 'moduleId',
      as: 'configurations'
    })
  }

  return Module
}