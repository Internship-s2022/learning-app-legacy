import { AdmissionTest } from './admission-test';
import { Course } from './course';
import { Postulant } from './postulant';

export interface AdmissionResult {
  _id?: string;
  admissionTest: AdmissionTest;
  score: number;
}

export interface PostulantCourse {
  _id?: string;
  postulant: Postulant;
  course: Course;
  answer: AnswerType[];
  admissionResults: AdmissionResult[];
  view: string;
}

export interface AnswerType {
  _id?: string;
  question: string;
  value?: string | string[];
}
