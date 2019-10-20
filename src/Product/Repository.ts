import * as sequelize from 'sequelize'
import { WhereOptions } from 'sequelize'
import { IFindOptions } from 'sequelize-typescript'
import { ItemListModel } from '../Model'
import { DataNotFound } from '../Response'
import { FilterDefault, RepositoryContract } from '../Repository'
import { NotificationType, ProductEntity } from '../Shared/Entity'
import { ErrorFactory } from '../Factory'
import { NotificationFactory } from '../Factory/Notification'

export class ProductRepository extends RepositoryContract {
  readonly Product
  readonly Variation
  readonly VariationSale
  readonly VariationAccess
  readonly CustomerVariationDeal

  public constructor (readonly models) {
    super()

    this.Product = this.models.Product
    this.Variation = this.models.Variation
    this.VariationSale = this.models.VariationSale
    this.VariationAccess = this.models.VariationAccess
    this.CustomerVariationDeal = this.models.CustomerVariationDeal
  }

  public async getAll (filter: Filter): Promise<ItemListModel<ProductEntity>> {

    const where: WhereOptions<ProductEntity> = {}

    if (filter.category) {
      where.category = { $like: `%${filter.category}%` }
    }

    if (filter.title) {
      where.title = { $like: `%${filter.title}%` }
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
              [sequelize.literal('(sum(variations.stock_quantity))'), 'totalQuantity'],
            ])
        }
      ],
      order: [
        sequelize.literal('`variations.totalQuantity` DESC'),
        ['title', 'ASC']
      ],
      group: 'Product.id',
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

  public async getMostSales (filter: Filter): Promise<ItemListModel<ProductEntity>> {

    const where: WhereOptions<ProductEntity> = {}

    const options: IFindOptions<ProductEntity> = {
      subQuery: false,
      include: [
        {
          model: this.Variation,
          as: 'variations',
          attributes: Object.keys(this.Variation.attributes).concat([
            //@ts-ignore
            [sequelize.literal('(sum((SELECT COUNT(*) FROM variation_sale WHERE `variation_sale`.`variation_id` = `variations`.`id`)))'), 'saleCount'],
          ]),
        }
      ],
      order: sequelize.literal('`variations.saleCount` DESC'),
      group: 'Product.id',
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

  public async getLeastSales (filter: Filter): Promise<ItemListModel<ProductEntity>> {

    const where: WhereOptions<ProductEntity> = {}

    const options: IFindOptions<ProductEntity> = {
      subQuery: false,
      include: [
        {
          model: this.Variation,
          as: 'variations',
          attributes: Object.keys(this.Variation.attributes).concat([
            //@ts-ignore
            [sequelize.literal('(sum((SELECT COUNT(*) FROM variation_sale WHERE `variation_sale`.`variation_id` = `variations`.`id`)))'), 'saleCount'],
          ]),
        }
      ],
      order: sequelize.literal('`variations.saleCount` ASC'),
      group: 'Product.id',
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

  public async getMostAccess (filter: Filter): Promise<ItemListModel<ProductEntity>> {

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
      group: 'Product.id',
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

  public async getLeastAccess (filter: Filter): Promise<ItemListModel<ProductEntity>> {

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
      group: 'Product.id',
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

  public async getNeedBuy (filter: Filter): Promise<ItemListModel<ProductEntity>> {

    const where: WhereOptions<ProductEntity> = {}

    if (filter.category) {
      where.category = filter.category
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
              [sequelize.literal('(sum(variations.stock_quantity))'), 'totalQuantity'],
            ])
        }
      ],
      order: sequelize.literal('`variations.totalQuantity` ASC, `variations.saleCount` DESC'),
      group: 'Product.id',
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

  public async getNeedSell (filter: Filter): Promise<ItemListModel<ProductEntity>> {

    const where: WhereOptions<ProductEntity> = {}

    if (filter.category) {
      where.category = filter.category
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
              [sequelize.literal('(sum(variations.stock_quantity))'), 'totalQuantity'],
            ])
        }
      ],
      order: sequelize.literal('`variations.totalQuantity` DESC, `variations.saleCount` ASC'),
      group: 'Product.id',
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

  public async get (id: string): Promise<ProductEntity> {

    const options: IFindOptions<ProductEntity> = {
      subQuery: false,
      include: [
        {
          model: this.Variation,
          as: 'variations'
        }
      ],
      order: [
        ['title', 'ASC'],
      ],
      where: {
        id
      }
    }

    const product = await this.Product.findOne(options)

    if (!product) {
      throw new DataNotFound()
    }

    return ProductEntity.build(product)
  }

  public async create (product: ProductEntity): Promise<ProductEntity> {
    const transaction = await this.Product.sequelize.transaction()

    try {
      const productSaved = await new this.Product(product).save({
        transaction
      })

      product.id = productSaved.id

      for (const variation of product.variations) {
        variation.productId = product.id

        const variationSaved = await new this.Variation(variation).save({
          transaction
        })

        if (variation.stockQuantity <= 10) {
          await NotificationFactory.create(
            this.models,
            'LOW_STOCK_QUANTITY',
            NotificationType.VARIATION,
            variation.sku,
            'Estoque baixo na variação.'
          )
        }

        variation.id = variationSaved.id
      }

      await transaction.commit()

    } catch (e) {

      await transaction.rollback()

      let error = e

      try {
        error = ErrorFactory.getFromSequelizeError(e)
      } catch (e) {
      }

      throw error
    }

    return this.get(product.id)
  }

  public async update (product: ProductEntity, deleteVariations: string[]): Promise<ProductEntity> {
    const transaction = await this.Product.sequelize.transaction()

    try {
      await this.Product.insertOrUpdate(product, {
        transaction
      })

      for (const id of deleteVariations) {
        await this.VariationAccess.destroy({
          where: {
            variationId: id
          },
          transaction
        })

        await this.VariationSale.destroy({
          where: {
            variationId: id
          },
          transaction
        })

        await this.CustomerVariationDeal.destroy({
          where: {
            variationId: id
          },
          transaction
        })

        await this.Variation.destroy({
          where: {
            id: id
          },
          transaction
        })
      }

      for (const variation of product.variations) {
        variation.productId = product.id

        const variationSaved = await this.Variation.insertOrUpdate(variation, {
          transaction
        })

        if (variation.stockQuantity <= 10) {
          await NotificationFactory.create(
            this.models,
            'LOW_STOCK_QUANTITY',
            NotificationType.VARIATION,
            variation.sku,
            'Estoque baixo na variação.'
          )
        }

        variation.id = variationSaved.id
      }

      await transaction.commit()

    } catch (e) {

      await transaction.rollback()

      let error = e

      try {
        error = ErrorFactory.getFromSequelizeError(e)
      } catch (e) {
      }

      throw error
    }

    return this.get(product.id)
  }
}

export interface Filter extends FilterDefault {
  category?: string
  title?: string
  dateFrom?: Date
  dateTo?: Date
}
