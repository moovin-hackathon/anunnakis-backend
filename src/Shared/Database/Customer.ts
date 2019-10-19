import { DataTypes } from 'sequelize'

export default (sequelize, dataTypes: DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: dataTypes.UUIDV4,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true
    },
    name: dataTypes.STRING,
    email: dataTypes.STRING
  }, {
    tableName: 'customer'
  })

  Customer.changeSchema = schema => Customer.schema(schema, {
    schemaDelimeter: '`.`'
  })

  Customer.associate = models => {
    Customer.belongsToMany(models.Variation, {
      through: 'CustomerVariationDeal',
      foreignKey: 'id',
      as: 'variations',
      otherKey: 'customerId'
    })
  }

  return Customer
}