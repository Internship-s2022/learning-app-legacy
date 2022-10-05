import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { ModalProps } from './types';

const Modal = ({ handleClose, handleConfirm, title, content, type, ...props }: ModalProps) => {
  return (
    <Dialog
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      {...props}
    >
      <DialogTitle sx={{ px: 5, pt: 5 }}>{title}</DialogTitle>
      <DialogContent sx={{ p: 5, width: 480, height: 100, overflow: 'hidden' }}>
        {content}
      </DialogContent>
      <DialogActions sx={{ p: 5 }}>
        {type == 'confirm' && (
          <>
            <Button variant="outlined" size="large" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" size="large" onClick={handleConfirm}>
              Confirm
            </Button>
          </>
        )}
        {type == 'alert' && (
          <Button variant="contained" onClick={handleClose}>
            Continue
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
