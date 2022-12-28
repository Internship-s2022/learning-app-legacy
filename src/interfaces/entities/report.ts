import { CourseUser } from './course-user';
import { ModuleForm, ModuleType } from './module';

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

export interface ReportStudent extends Omit<Report, 'courseUser' | 'module' | 'exams'> {
  courseUser?: string;
  module: ModuleForm;
  [k: string]: string | boolean | object | object[];
}
