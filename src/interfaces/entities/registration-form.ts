import { GeneralDataType } from 'src/interfaces';

import { Course } from './course';

export interface View extends GeneralDataType {
  _id?: string;
  name: string;
}

export interface RegistrationFormType {
  _id?: string;
  course: Course;
  title: string;
  description: string;
  views: View[];
  isActive: boolean;
}
