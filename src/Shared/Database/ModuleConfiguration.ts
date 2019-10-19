import { DataTypes } from 'sequelize'

export default (sequelize, dataTypes: DataTypes) => {
  const ModuleConfiguration = sequelize.define('ModuleConfiguration', {
    moduleId: {
      field: 'module_id',
      type: dataTypes.UUIDV4,
      primaryKey: true,
      references: {
        model: 'Module',
        key: 'id'
      }
    },
    identifier: {
      type: dataTypes.STRING,
      primaryKey: true
    },
    label: dataTypes.STRING,
    value: dataTypes.STRING
  }, {
    tableName: 'module_configuration'
  })

  ModuleConfiguration.changeSchema = schema => ModuleConfiguration.schema(schema, {
    schemaDelimeter: '`.`'
  })

  ModuleConfiguration.associate = models => {
    ModuleConfiguration.belongsTo(models.Module, {
      foreignKey: 'moduleId',
      as: 'module'
    })
  }

  return ModuleConfiguration
}