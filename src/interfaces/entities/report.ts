import { CourseUser } from './course-user';
import { ModuleType } from './module';

export interface ExamType {
  _id?: string;
  name: string;
  grade: number;
}

export interface Report {
  _id?: string;
  module: ModuleType;
  courseUser: CourseUser;
  exams: ExamType[];
  assistance: boolean;
}
