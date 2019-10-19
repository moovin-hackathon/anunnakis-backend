import { ModuleConfigurationEntity } from './ModuleConfiguration'

export class ModuleEntity {
  public id: string

  public name: string

  public identifier: string

  public status: boolean

  public configurations: ModuleConfigurationEntity[]
}
