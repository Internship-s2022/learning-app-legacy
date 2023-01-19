import { Control, UseFieldArrayRemove, UseFormWatch } from 'react-hook-form';

import { QuestionsForm } from '../types';

export interface QuestionProps {
  childIndex: number;
  isEditable: boolean;
  control: Control<QuestionsForm, unknown>;
  watch: UseFormWatch<QuestionsForm>;
  remove: UseFieldArrayRemove;
  isLoading: boolean;
  isDragging: boolean;
  setReorder: (index: string, reorderCb: (from: number, to: number) => void) => void;
}
