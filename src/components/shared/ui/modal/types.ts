import { DialogProps } from '@mui/material';

export interface ModalProps extends DialogProps {
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  content: JSX.Element | string;
  type: 'confirm' | 'alert';
}
