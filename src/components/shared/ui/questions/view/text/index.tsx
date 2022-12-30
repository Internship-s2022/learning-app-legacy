import React from 'react';

import InputText from 'src/components/shared/ui/inputs/text/index';

import { ViewTextQuestionProps } from './types';

const ViewTextQuestion = ({ name, type, control }: ViewTextQuestionProps): JSX.Element => {
  const isParagraph = type === 'PARAGRAPH';
  return (
    <InputText
      defaultValue=""
      name={name}
      control={control}
      fullWidth={true}
      variant="outlined"
      multiline={isParagraph}
      rows={isParagraph ? 4 : 1}
    />
  );
};

export default ViewTextQuestion;
