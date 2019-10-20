import { DataTypes } from 'sequelize'

export default (sequelize, dataTypes: DataTypes) => {
  const VariationAccess = sequelize.define('VariationAccess', {
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
    tableName: 'variation_access',
    timestamps: true,
    createdAt: true,
    updatedAt: false
  })

  VariationAccess.changeSchema = schema => VariationAccess.schema(schema, {
    schemaDelimeter: '`.`'
  })

  VariationAccess.associate = models => {
  }

  return VariationAccess
}