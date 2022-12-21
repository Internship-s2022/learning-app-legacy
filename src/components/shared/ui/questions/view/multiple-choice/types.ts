import { Control, FieldValues } from 'react-hook-form';

import { ViewOptionType } from '../types';

export interface ViewMultipleChoiceProps {
  options: ViewOptionType[];
  name: string;
  control: Control<FieldValues>;
}
