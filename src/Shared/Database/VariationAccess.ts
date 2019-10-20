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
      field: 'variation_id',
      references: {
        model: 'Variation',
        key: 'id'
      }
    },
    createdAt: dataTypes.DATE
  }, {
    tableName: 'variation_access',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false
  })

  VariationAccess.changeSchema = schema => VariationAccess.schema(schema, {
    schemaDelimeter: '`.`'
  })

  VariationAccess.associate = models => {
  }

  return VariationAccess
}