import { Control, FieldValues } from 'react-hook-form';

import { ViewOptionType } from '../types';

export interface ViewDropdownQuestionProps {
  name: string;
  title: string;
  control: Control<FieldValues>;
  options: ViewOptionType[];
}
