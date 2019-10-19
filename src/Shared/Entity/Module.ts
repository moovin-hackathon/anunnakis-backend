import { ModuleConfigurationEntity } from './ModuleConfiguration'

export class ModuleEntity {
  public id: string

  public name: string

  public identifier: string

  public status: boolean

  public configurations: ModuleConfigurationEntity[]

  public static build (data): ModuleEntity {
    const entity = new ModuleEntity()
    entity.id = data.id
    entity.name = data.name
    entity.identifier = data.identifier
    entity.status = data.status

    if (data.configurations) {
      entity.configurations = data.configurations.map(ModuleConfigurationEntity.build)
    }

    return entity
  }
}
