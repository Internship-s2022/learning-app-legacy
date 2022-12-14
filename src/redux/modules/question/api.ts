import apiClient from 'src/config/api';
import { QuestionType } from 'src/interfaces/entities/question';

import { Params } from '../types';

interface QuestionParams extends Params {
  regFormId?: string;
}

interface CreateQuestionParams {
  query?: string;
  data?: QuestionType[];
  id?: string;
  regFormId?: string;
}

export const getQuestionsRequest = (params: QuestionParams) =>
  apiClient.get<QuestionType[]>(`/registration-form/${params.regFormId}/question${params.query}`);

export const getQuestionByIdRequest = (params: QuestionParams) =>
  apiClient.get<QuestionType>(`/registration-form/${params.regFormId}/question/${params.id}`);

export const createQuestionsRequest = (params: CreateQuestionParams) =>
  apiClient.post<QuestionType[]>(`/registration-form/${params.regFormId}/question`, params.data);

export const editQuestionRequest = (params: QuestionParams) =>
  apiClient.put<QuestionType>(
    `/registration-form/${params.regFormId}/question/${params.id}`,
    params.data,
  );
