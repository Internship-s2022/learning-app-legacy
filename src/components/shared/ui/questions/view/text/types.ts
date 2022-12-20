import { Control, FieldValues } from 'react-hook-form';

import { QuestionTypes } from 'src/interfaces/entities/question';

export interface ViewTextQuestionProps {
  name: string;
  title: string;
  type: QuestionTypes;
  control: Control<FieldValues>;
}
