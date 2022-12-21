import {
  Control,
  FieldValues,
  UseFieldArrayRemove,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import { QuestionType } from 'src/interfaces/entities/question';

export interface QuestionProps {
  childIndex: number;
  isEditable: boolean;
  questionData: QuestionType;
  control: Control<FieldValues, unknown>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  remove: UseFieldArrayRemove;
}
