import { ActionType } from 'typesafe-actions';

import { CourseUser } from 'src/interfaces/entities/course-user';
import { StudentReport } from 'src/interfaces/entities/report';
import { User } from 'src/interfaces/entities/user';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export type UserType = 'SUPER_ADMIN' | 'NORMAL';
export interface GetMeInfo {
  courses: CourseUser[];
  currentUser: User;
}
export interface AuthProps {
  userType: UserType | undefined;
  isNewUser: boolean | undefined;
  currentUid: string | undefined;
}

export interface State extends AsyncState {
  authenticated: AuthProps;
  studentReports: StudentReport[];
  userInfo: GetMeInfo;
}

export interface CredentialsProp {
  email: string;
  password: string;
}

export interface ChangePassProp {
  newPassword: string;
  firebaseUid: string;
  isNewUser: boolean;
}

export interface ChangePassResponse {
  uid: string;
  email: string;
  userType: UserType;
}

export enum Actions {
  LOGIN_FETCHING = 'LOGIN_FETCHING',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  GET_ME_FETCHING = 'GET_ME_FETCHING',
  GET_ME_SUCCESS = 'GET_ME_SUCCESS',
  GET_ME_ERROR = 'GET_ME_ERROR',
  SET_AUTHENTICATION = 'SET_AUTHENTICATION',
  LOGOUT_FETCHING = 'LOGOUT_FETCHING',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_ERROR = 'LOGOUT_ERROR',
  NEW_PASS_FETCHING = 'NEW_PASS_FETCHING',
  NEW_PASS_SUCCESS = 'NEW_PASS_SUCCESS',
  NEW_PASS_ERROR = 'NEW_PASS_ERROR',
  GET_STUDENT_REPORTS_FETCHING = 'GET_STUDENT_REPORTS_FETCHING',
  GET_STUDENT_REPORTS_SUCCESS = 'GET_STUDENT_REPORTS_SUCCESS',
  GET_STUDENT_REPORTS_ERROR = 'GET_STUDENT_REPORTS_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
