import { DataTypes } from 'sequelize'

export default (sequelize, dataTypes: DataTypes) => {
  const CustomerVariationDeal = sequelize.define('CustomerVariationDeal', {
    id: {
      type: dataTypes.UUIDV4,
      defaultValue: dataTypes.UUIDV4,
      primaryKey: true
    },
    variationId: {
      field: 'variation_id',
      type: dataTypes.UUIDV4,
      references: {
        model: 'Variation',
        key: 'id'
      }
    },
    customerId: {
      field: 'customer_id',
      type: dataTypes.UUIDV4,
      references: {
        model: 'Customer',
        key: 'id'
      }
    },
    variationPrice: {
      field: 'variation_price',
      type: dataTypes.DECIMAL
    },
    dealPrice: {
      field: 'deal_price',
      type: dataTypes.DECIMAL
    },
    status: dataTypes.ENUM(['NEW', 'ACCEPTED', 'REFUSED']),
    dealUri: {
      field: 'deal_uri',
      type: dataTypes.STRING
    },
    dealUriExpires: {
      field: 'deal_uri_expires',
      type: dataTypes.DATE
    }
  }, {
    tableName: 'customer_variation_deal',
    timestamps: true,
    createdAt: true,
    updatedAt: false
  })

  CustomerVariationDeal.changeSchema = schema => CustomerVariationDeal.schema(schema, {
    schemaDelimeter: '`.`'
  })

  CustomerVariationDeal.associate = models => {
    CustomerVariationDeal.belongsTo(models.Variation, {
      foreignKey: 'variationId',
      as: 'variation',
    })

    CustomerVariationDeal.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer',
    })
  }

  return CustomerVariationDeal
}