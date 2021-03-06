import { DataTypes } from 'sequelize'

export default (sequelize, dataTypes: DataTypes) => {
  const Variation = sequelize.define('Variation', {
    id: {
      type: dataTypes.UUIDV4,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true
    },
    productId: {
      type: dataTypes.UUIDV4,
      field: 'product_id',
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    sku: dataTypes.STRING,
    images: dataTypes.JSON,
    previousPrice: {
      field: 'previous_price',
      type: dataTypes.DECIMAL
    },
    currentPrice: {
      field: 'current_price',
      type: dataTypes.DECIMAL
    },
    stockQuantity: {
      field: 'stock_quantity',
      type: dataTypes.INTEGER
    },
    uri: dataTypes.STRING,
    color: dataTypes.STRING,
    grid: dataTypes.STRING,
    gridType: {
      field: 'grid_type',
      type: dataTypes.ENUM(['SIZE', 'FLAVOR', 'VOLTAGE'])
    }
  }, {
    tableName: 'variation'
  })

  Variation.changeSchema = schema => Variation.schema(schema, {
    schemaDelimeter: '`.`'
  })

  Variation.associate = models => {
    Variation.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product'
    })
    Variation.hasMany(models.VariationSale, {
      foreignKey: 'variationId',
      as: 'sales'
    })
    Variation.hasMany(models.VariationAccess, {
      foreignKey: 'variationId',
      as: 'accesses'
    })
  }

  return Variation
}