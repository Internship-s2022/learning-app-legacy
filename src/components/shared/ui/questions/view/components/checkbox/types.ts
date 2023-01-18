import { UseControllerProps } from 'react-hook-form';

import { ViewOptionType } from '../../types';

export type ViewCheckboxQuestionProps<TFormValues> = UseControllerProps<TFormValues> & {
  options: ViewOptionType[];
};
