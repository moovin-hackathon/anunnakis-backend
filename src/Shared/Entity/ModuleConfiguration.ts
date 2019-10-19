import { ModuleEntity } from './Module'

export class ModuleConfigurationEntity {
  public moduleId: string

  public identifier: string

  public label: string

  public value: string

  public module: ModuleEntity

  public static build (data): ModuleConfigurationEntity {
    const entity = new ModuleConfigurationEntity()
    entity.moduleId = data.moduleId
    entity.identifier = data.identifier
    entity.label = data.label
    entity.value = data.value

    if (data.module) {
      entity.module = ModuleEntity.build(data.module)
    }

    return entity
  }
}
