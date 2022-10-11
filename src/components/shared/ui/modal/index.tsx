import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import { RootReducer } from 'src/redux/modules/types';
import { hideModal } from 'src/redux/modules/ui/actions';

const Modal = ({ ...props }) => {
  const { title, description, open, type, handleConfirm } = useSelector(
    (state: RootReducer) => state.ui.modal,
  );
  const dispatch = useDispatch();
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
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {typeof description == 'string' ? <Text variant="body1">{description}</Text> : description}
      </DialogContent>
      <DialogActions>
        {type == 'confirm' && (
          <>
            <Button variant="outlined" size="large" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                handleConfirm(), handleClose();
              }}
            >
              Confirm
            </Button>
          </>
        )}
        {type == 'alert' && (
          <Button variant="contained" size="large" onClick={handleClose}>
            Continue
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
