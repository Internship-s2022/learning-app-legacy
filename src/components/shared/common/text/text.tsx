import * as React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
type Props = TypographyProps;

const Text = (props: Props): JSX.Element => {
  return <Typography {...props}></Typography>;
};
export default Text;
