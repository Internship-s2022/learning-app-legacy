import { ModuleType } from 'src/interfaces/entities/module';

export interface ModuleForm extends Omit<ModuleType, 'groups'> {
  groups: string[];
}
