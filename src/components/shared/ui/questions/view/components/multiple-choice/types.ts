import { UseControllerProps } from 'react-hook-form';

import { ViewOptionType } from 'src/components/shared/ui/questions/view/types';

export type ViewMultipleChoiceProps<TFormValues> = UseControllerProps<TFormValues> & {
  options: ViewOptionType[];
};
