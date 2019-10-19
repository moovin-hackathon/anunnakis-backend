import { DataTypes } from 'sequelize'

export default (sequelize, dataTypes: DataTypes) => {
  const Account = sequelize.define('Account', {
    id: {
      type: dataTypes.UUIDV4,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true
    },
    name: dataTypes.STRING
  }, {
    tableName: 'account'
  })

  Account.changeSchema = schema => Account.schema(schema, {
    schemaDelimeter: '`.`'
  })

  Account.associate = models => {
    Account.hasMany(models.User, {
      foreignKey: 'accountId',
      as: 'users'
    })
  }

  return Account
}