import { DataTypes } from 'sequelize'

export default (sequelize, dataTypes: DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: dataTypes.UUIDV4,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true
    },
    title: dataTypes.STRING,
    collatorCode: {
      field: 'collator_code',
      type: dataTypes.STRING
    },
    category: dataTypes.STRING
  }, {
    tableName: 'product'
  })

  Product.changeSchema = schema => Product.schema(schema, {
    schemaDelimeter: '`.`'
  })

  Product.associate = models => {
    Product.hasMany(models.Variation, {
      foreignKey: 'productId',
      as: 'variations'
    })
  }

  return Product
}