import { AdmissionTest } from 'src/interfaces/entities/admission-test';
import { User } from 'src/interfaces/entities/user';

import { GeneralDataType } from '..';

export type RoleType = 'ADMIN' | 'TUTOR' | 'AUXILIARY' | 'STUDENT';

export interface Course {
  _id: string;
  name: string;
  admissionTests?: AdmissionTest[];
  courseUsers?: SelectedUsers[];
  description: string;
  inscriptionStartDate: string;
  inscriptionEndDate: string;
  startDate: string;
  endDate: string;
  type: string;
  isInternal: string;
  isActive: boolean;
}

export interface SelectedUsers {
  user: User;
  role?: RoleType;
  isActive: boolean;
}

export interface CourseUser extends SelectedUsers, GeneralDataType {
  course?: string;
}
