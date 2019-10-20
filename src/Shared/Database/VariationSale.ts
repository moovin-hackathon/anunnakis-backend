import { DataTypes } from 'sequelize'

export default (sequelize, dataTypes: DataTypes) => {
  const VariationSale = sequelize.define('VariationSale', {
    id: {
      type: dataTypes.UUIDV4,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true
    },
    variationId: {
      type: dataTypes.UUIDV4,
      references: {
        model: 'Variation',
        key: 'id'
      }
    },
  }, {
    tableName: 'variation_sale',
    timestamps: true,
    createdAt: true,
    updatedAt: false
  })

  VariationSale.changeSchema = schema => VariationSale.schema(schema, {
    schemaDelimeter: '`.`'
  })

  VariationSale.associate = models => {
  }

  return VariationSale
}