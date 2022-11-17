import { IconButtonProps, SelectProps, TablePaginationProps } from '@mui/material';

export type CustomTablePaginationProps = TablePaginationProps & {
  backIconButtonProps: Partial<IconButtonProps<'button', Record<string, string>>>;
  nextIconButtonProps: Partial<IconButtonProps<'button', Record<string, string>>>;
  SelectProps: Partial<SelectProps<unknown> & Record<string, string>>;
};
