import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';
import { hideModal } from 'src/redux/modules/ui/actions';

const Modal = ({ ...props }) => {
  const { title, description, open, type, handleConfirm } = useAppSelector(
    (state: RootReducer) => state.ui.modal,
  );
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <Dialog
      keepMounted
      onClose={handleClose}
      open={open}
      aria-describedby="alert-dialog-slide-description"
      {...props}
      PaperProps={
        {
          'data-testid': 'modal-container-div',
        } as any
      }
    >
      <DialogTitle color="primary">{title}</DialogTitle>
      <DialogContent>
        {typeof description == 'string' ? <Text variant="body1">{description}</Text> : description}
      </DialogContent>
      <DialogActions>
        {type == 'confirm' && (
          <>
            <Button
              data-testid="modal-cancel-btn"
              variant="outlined"
              size="medium"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              data-testid="modal-confirm-btn"
              variant="contained"
              size="medium"
              onClick={() => {
                handleConfirm(), handleClose();
              }}
            >
              Confirmar
            </Button>
          </>
        )}
        {type == 'alert' && (
          <Button
            data-testid="modal-continue-btn"
            variant="contained"
            size="medium"
            onClick={handleClose}
          >
            Continuar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
