import { Control, FieldValues } from 'react-hook-form';

import { ViewOptionType } from '../types';

export interface ViewCheckboxQuestionProps {
  name: string;
  control: Control<FieldValues>;
  options: ViewOptionType[];
}
