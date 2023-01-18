import { ActionType } from 'typesafe-actions';

import { Course } from 'src/interfaces/entities/course';
import { AnswerType, QuestionType } from 'src/interfaces/entities/question';

import { AsyncState, Params } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  course: Course;
  courses: Course[];
  registrationForm: PublicRegistrationFormType;
}

export interface PublicRegistrationFormType {
  title: string;
  description: string;
  questions: QuestionType[];
}

export interface PublicRegistrationFormParams extends Params<QuestionType[]> {
  courseId?: string;
  viewId?: string;
}

export interface PostulationType {
  view?: string;
  answer: AnswerType[];
}

export interface PostulationParams extends Params<PostulationType> {
  courseId?: string;
}

export enum Actions {
  GET_PUBLIC_COURSES_FETCHING = 'GET_PUBLIC_COURSES_FETCHING',
  GET_PUBLIC_COURSES_SUCCESS = 'GET_PUBLIC_COURSES_SUCCESS',
  GET_PUBLIC_COURSES_ERROR = 'GET_PUBLIC_COURSES_ERROR',
  GET_PUBLIC_REGISTRATION_FORM_FETCHING = 'GET_PUBLIC_REGISTRATION_FORM_FETCHING',
  GET_PUBLIC_REGISTRATION_FORM_SUCCESS = 'GET_PUBLIC_REGISTRATION_FORM_SUCCESS',
  GET_PUBLIC_REGISTRATION_FORM_ERROR = 'GET_PUBLIC_REGISTRATION_FORM_ERROR',
  CREATE_POSTULATION_FETCHING = 'CREATE_POSTULATION_FETCHING',
  CREATE_POSTULATION_SUCCESS = 'CREATE_POSTULATION_SUCCESS',
  CREATE_POSTULATION_ERROR = 'CREATE_POSTULATION_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
