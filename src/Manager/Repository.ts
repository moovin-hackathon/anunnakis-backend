import * as sequelize from 'sequelize'
import { WhereOptions } from 'sequelize'
import { IFindOptions } from 'sequelize-typescript'
import { ItemListModel } from '../Model'
import { FilterDefault, RepositoryContract } from '../Repository'
import { ProductEntity } from '../Shared/Entity'

export class ManagerRepository extends RepositoryContract {
  readonly Product
  readonly Variation
  readonly VariationSale
  readonly VariationAccess

  public constructor (readonly models) {
    super()

    this.Product = this.models.Product
    this.Variation = this.models.Variation
    this.VariationSale = this.models.VariationSale
    this.VariationAccess = this.models.VariationAccess
  }

  public async getAll (filter: Filter): Promise<ItemListModel<ProductEntity>> {

    const orderMap = {
      'stock': '`variations.totalQuantity`',
      'views': '`variations.accessCount`',
      'sales': '`variations.saleCount`'
    }

    const where: WhereOptions<ProductEntity> = {}

    if (filter.category) {
      where.category = { $like: `%${filter.category}%` }
    }

    if (filter.title) {
      where.title = { $like: `%${filter.title}%` }
    }

    let order = '`variations.saleCount` DESC'
    if (filter.order && filter.orderType) {
      order = `${orderMap[filter.order.toLowerCase()]} ${filter.orderType.toUpperCase()}`
    }

    const options: IFindOptions<ProductEntity> = {
      subQuery: false,
      include: [
        {
          model: this.Variation,
          as: 'variations',
          attributes: Object.keys(this.Variation.attributes).concat([
            //@ts-ignore
            [sequelize.literal('(sum((SELECT COUNT(*) FROM variation_sale WHERE `variation_sale`.`variation_id` = `variations`.`id`)))'), 'saleCount'],
          ])
            .concat([
              //@ts-ignore
              [sequelize.literal('(sum((SELECT COUNT(*) FROM variation_access WHERE `variation_access`.`variation_id` = `variations`.`id`)))'), 'accessCount'],
            ])
            .concat([
              //@ts-ignore
              [sequelize.literal('(sum(variations.stock_quantity))'), 'totalQuantity'],
            ])
        }
      ],
      order: sequelize.literal(order),
      // @ts-ignore
      where
    }

    const total = await this.Product.count({
      // @ts-ignore
      where
    })

    this.applyPaginator(filter, options)

    const items = (await this.Product.findAll(options))

    return {
      items,
      total
    }
  }
}

export interface Filter extends FilterDefault {
  category?: string
  title?: string
  dateFrom?: Date
  dateTo?: Date
  orderType?: string
  order?: string
}
