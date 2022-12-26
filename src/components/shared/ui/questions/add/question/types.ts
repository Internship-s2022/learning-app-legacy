import { Control, UseFieldArrayRemove } from 'react-hook-form';

import { QuestionsForm } from '../types';

export interface QuestionProps {
  childIndex: number;
  isEditable: boolean;
  control: Control<QuestionsForm, unknown>;
  remove: UseFieldArrayRemove;
  isLoading: boolean;
}
