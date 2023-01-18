import apiClient from 'src/config/api';
import { QuestionType } from 'src/interfaces/entities/question';

import { QuestionParams } from './types';

export const getQuestionsRequest = (params: QuestionParams) =>
  apiClient.get<QuestionType[]>(`/registration-form/${params.regFormId}/question${params.query}`);

export const editQuestionsRequest = (params: QuestionParams) =>
  apiClient.put<QuestionType[]>(
    `/registration-form/${params.regFormId}/question/view/${params.viewId}`,
    params.data,
  );
