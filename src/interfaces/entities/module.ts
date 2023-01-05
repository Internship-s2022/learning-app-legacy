import { Course } from './course';
import { Group } from './group';

export type ModuleTypes = 'DEV' | 'QA' | 'UIUX' | 'GENERAL';

export type ModuleStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface ModuleType {
  _id: string;
  course: Course;
  name: string;
  description: string;
  status?: ModuleStatus;
  type?: ModuleTypes;
  groups?: Group[];
  contents: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ModuleForm extends Omit<ModuleType, 'groups' | 'course'> {
  course: string;
  groups: string[];
}
