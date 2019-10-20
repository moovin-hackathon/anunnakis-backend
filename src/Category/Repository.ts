import * as sequelize from 'sequelize'
import { WhereOptions } from 'sequelize'
import { IFindOptions } from 'sequelize-typescript'
import { ItemListModel } from '../Model'
import { FilterDefault, RepositoryContract } from '../Repository'
import { ProductEntity } from '../Shared/Entity'

export class CategoryRepository extends RepositoryContract {
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

  public async getAll (): Promise<ItemListModel<ProductEntity>> {

    const where: WhereOptions<ProductEntity> = {}

    const options: IFindOptions<ProductEntity> = {
      attributes: [[sequelize.literal('DISTINCT `category`'), 'category']],
      order: [
        [
          'category', 'ASC'
        ]
      ],
      // @ts-ignore
      where
    }

    const total = await this.Product.count({
      // @ts-ignore
      where
    })

    const items = (await this.Product.findAll(options))

    return {
      items,
      total
    }
  }

  public async getMostAccess (filter: Filter): Promise<any> {

    const where: WhereOptions<ProductEntity> = {}

    const options: IFindOptions<ProductEntity> = {
      subQuery: false,
      include: [
        {
          model: this.Variation,
          as: 'variations',
          attributes: Object.keys(this.Variation.attributes).concat([
            //@ts-ignore
            [sequelize.literal('(sum((SELECT COUNT(*) FROM variation_access WHERE `variation_access`.`variation_id` = `variations`.`id`)))'), 'accessCount'],
          ]),
        }
      ],
      order: sequelize.literal('`variations.accessCount` DESC'),
      group: 'Product.category',
      // @ts-ignore
      where
    }

    const total = await this.Product.count({
      // @ts-ignore
      where
    })

    this.applyPaginator(filter, options)

    const items = (await this.Product.findAll(options))

    return items.map(item => ({
      category: item.category,
      variation: item.variations[0]
    }))
  }

  public async getLeastAccess (filter: Filter): Promise<any> {

    const where: WhereOptions<ProductEntity> = {}

    const options: IFindOptions<ProductEntity> = {
      subQuery: false,
      include: [
        {
          model: this.Variation,
          as: 'variations',
          attributes: Object.keys(this.Variation.attributes).concat([
            //@ts-ignore
            [sequelize.literal('(sum((SELECT COUNT(*) FROM variation_access WHERE `variation_access`.`variation_id` = `variations`.`id`)))'), 'accessCount'],
          ]),
        }
      ],
      order: sequelize.literal('`variations.accessCount` ASC'),
      group: 'Product.category',
      // @ts-ignore
      where
    }

    const total = await this.Product.count({
      // @ts-ignore
      where
    })

    this.applyPaginator(filter, options)

    const items = (await this.Product.findAll(options))

    return items.map(item => ({
      category: item.category,
      variation: item.variations[0]
    }))
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
