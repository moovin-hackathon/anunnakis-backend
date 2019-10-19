import { DataTypes } from 'sequelize'

export default (sequelize, dataTypes: DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: dataTypes.UUIDV4,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true
    },
    name: dataTypes.STRING,
    email: dataTypes.STRING,
    password: dataTypes.STRING,
    token: dataTypes.STRING,
    tokenExpires: {
      field: 'token_expires',
      type: dataTypes.DATE
    },
    accountId: {
      type: dataTypes.UUIDV4,
      field: 'account_id',
      references: {
        model: 'Account',
        key: 'id'
      }
    }
  }, {
    tableName: 'user'
  })

  User.changeSchema = schema => User.schema(schema, {
    schemaDelimeter: '`.`'
  })

  return User
}