import { Control, FieldValues } from 'react-hook-form';

import { QuestionTypes } from 'src/interfaces/entities/question';

export interface ViewTextQuestionProps {
  name: string;
  type: QuestionTypes;
  control: Control<FieldValues>;
}
