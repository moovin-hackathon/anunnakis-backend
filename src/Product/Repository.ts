import { WhereOptions } from 'sequelize'
import { IFindOptions } from 'sequelize-typescript'
import { ItemListModel } from '../Model'
import { DataNotFound } from '../Response'
import { FilterDefault, RepositoryContract } from '../Repository'
import { ProductEntity } from '../Shared/Entity'

export class ProductRepository extends RepositoryContract {
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

    const where: WhereOptions<ProductEntity> = {}

    if (filter.category) {
      where.category = { $like: `5${filter.category}%` }
    }

    if (filter.title) {
      where.title = { $like: `5${filter.title}%` }
    }

    const options: IFindOptions<ProductEntity> = {
      include: [
        {
          model: this.Variation,
          as: 'variations',
          include: [
            {
              model: this.VariationAccess,
              as: 'accesses'
            },
            {
              model: this.VariationSale,
              as: 'sales'
            }
          ]
        }
      ],
      order: [
        ['title', 'ASC']
      ],
      // @ts-ignore
      where
    }

    const total = await this.Product.count({
      // @ts-ignore
      where
    })

    this.applyPaginator(filter, options)

    const items = (await this.Product.findAll(options)).map(ProductEntity.build)

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
          as: 'variations',
          include: [
            {
              model: this.VariationAccess,
              as: 'accesses'
            },
            {
              model: this.VariationSale,
              as: 'sales'
            }
          ]
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
}

export interface Filter extends FilterDefault {
  category?: string
  title?: string
}
