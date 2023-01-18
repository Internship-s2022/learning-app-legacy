import * as React from 'react';
import Typography from '@mui/material/Typography';

import Props from './types';

const Text = (props: Props): JSX.Element => {
  return <Typography {...props}></Typography>;
};

export default Text;
