import { Course } from './course';

type View = {
  _id?: string;
  name: string;
};

export interface RegistrationFormType {
  _id?: string;
  course: Course;
  title: string;
  description: string;
  views: View[];
  isActive: boolean;
}
