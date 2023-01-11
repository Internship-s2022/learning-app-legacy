import { AdmissionTest } from 'src/interfaces/entities/admission-test';

import { SelectedUsers } from './course-user';

export type CourseLong = 'EXPRESS' | 'FULL';

export type CourseStatus = 'COMPLETED' | 'IN_PROGRESS' | 'SOON' | 'OPEN_INSCRIPTION';

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
  status?: CourseStatus;
  isInternal: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface FormCourse {
  _id: string;
  name: string;
  admissionTests?: AdmissionTest[];
  courseUsers?: SelectedUsers[];
  description: string;
  inscriptionStartDate: Date;
  inscriptionEndDate: Date;
  startDate: Date;
  endDate: Date;
  type: string;
  status?: CourseStatus;
  isInternal: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
