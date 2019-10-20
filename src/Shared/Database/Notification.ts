import { DataTypes } from 'sequelize'

export default (sequelize, dataTypes: DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: {
      type: dataTypes.UUIDV4,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true
    },
    identifier: dataTypes.STRING,
    type: dataTypes.ENUM([ 'VARIATION' ]),
    code: dataTypes.STRING,
    message: dataTypes.STRING,
    createdAt: dataTypes.DATE,
    viewed: dataTypes.BOOLEAN
  }, {
    tableName: 'notification',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false
  })

  Notification.changeSchema = schema => Notification.schema(schema, {
    schemaDelimeter: '`.`'
  })

  return Notification
}