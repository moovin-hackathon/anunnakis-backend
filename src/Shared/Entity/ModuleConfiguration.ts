import { ModuleEntity } from './Module'

export class ModuleConfigurationEntity {
  public moduleId: string

  public identifier: string

  public label: string

  public value: string

  public module: ModuleEntity
}
