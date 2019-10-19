export abstract class RepositoryContract {
    protected applyPaginator (filter: FilterDefault, options: any) {
      const page = this.getPage(filter)
      const size = this.getSize(filter)
  
      options.offset = (page - 1) * size
      options.limit = size
    }
  
    protected getPage (filter: FilterDefault) {
      let page = 1
      if (parseInt(filter.page) > 0) {
        page = parseInt(filter.page)
      }
  
      return page
    }
  
    protected getSize (filter: FilterDefault) {
      let size = 15
      if (parseInt(filter.size) > 0) {
        size = parseInt(filter.size)
        if (parseInt(filter.size) > 100) {
          size = 100
        }
      }
  
      return size
    }
  }
  
  export interface FilterDefault {
    page?: string
    size?: string
  }