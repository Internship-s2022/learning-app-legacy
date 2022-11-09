import { User } from 'src/interfaces/entities/user';

export interface CourseTypes {
  name: string;
  description: string;
  inscriptionStartDate: string;
  inscriptionEndDate: string;
  startDate: string;
  endDate: string;
  type: string;
  courseUsers?: SelectedUsers[];
  isInternal: string;
  isActive: boolean;
}

export type RoleType = 'ADMIN' | 'TUTOR' | 'AUXILIARY' | 'STUDENT';

export interface SelectedUsers {
  user: User;
  role: RoleType;
  isActive: boolean;
}

export interface CourseUser extends SelectedUsers {
  course?: string;
}
