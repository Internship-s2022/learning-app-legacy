import { Control } from 'react-hook-form';

import { AnswersForm, QuestionType } from 'src/interfaces/entities/question';

export interface ViewOptionType {
  label: string;
  value: string;
}

export interface ViewRegistrationFormProps {
  questions: QuestionType[];
  control: Control<AnswersForm, unknown>;
  isLoading: boolean;
}
