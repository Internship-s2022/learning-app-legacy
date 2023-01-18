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

export interface StudentReport extends Omit<Report, 'courseUser' | 'module' | 'exams'> {
  courseUser?: string;
  module?: ModuleForm;
  [k: string]: string | boolean | object | object[];
}

export interface GroupStudentReport {
  _id: string;
  student: CourseUser;
  reports: {
    _id: string;
    module: string;
    exams: ExamType[];
    assistance: boolean;
  }[];
}

export interface MapGroupStudentReport {
  _id: string;
  student: CourseUser;
  reports: {
    [k: string]: string;
  };
}
