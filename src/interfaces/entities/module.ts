import { Course } from './course';
export type ModuleTypes = 'DEV' | 'QA' | 'UIUX' | 'GENERAL';

export type ModuleStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface ModuleType {
  _id: string;
  course: Course;
  name: string;
  description: string;
  status?: ModuleStatus;
  type?: ModuleTypes;
  groups?: string[];
  contents: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
