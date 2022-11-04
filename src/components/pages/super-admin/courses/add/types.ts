import { Postulant, User } from 'src/redux/modules/user/types';
export interface CourseType {
  name: string;
  inscriptionStartDate: string;
  inscriptionEndDate: string;
  startDate: string;
  endDate: string;
  type: string;
  description: string;
  isInternal: boolean;
  isActive: boolean;
}

export interface CourseFormValues {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  technologies: string[];
}
type RoleType = 'ADMIN' | 'TUTOR' | 'AUXILIARY' | 'STUDENT';

export interface CourseUser {
  course: string;
  user: User;
  role: string;
  isActive: boolean;
}
export interface SelectedUsers {
  course: string;
  postulant: Postulant;
  user: string;
  role: RoleType;
  isActive: boolean;
}
