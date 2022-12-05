import apiClient from 'src/config/api';
import { RegistrationFormType } from 'src/interfaces/entities/registration-form';

import { Params } from '../types';

export const getRegistrationFormRequest = () =>
  apiClient.get<RegistrationFormType[]>('/registration-form?isActive=true');

export const getRegistrationFormByCourseIdRequest = (params: Params) =>
  apiClient.get<RegistrationFormType>(`/registration-form${params.query}`);

export const deleteRegistrationFormRequest = (params: Params) =>
  apiClient.patch<RegistrationFormType>(`/registration-form/${params.id}`);
