import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

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

  const styles = {
    title: { px: 5, pt: 5 },
    content: { p: 5, width: 480, height: 100, overflow: 'hidden' },
    actions: { p: 5 },
  };

  return (
    <Dialog
      keepMounted
      onClose={handleClose}
      open={open}
      aria-describedby="alert-dialog-slide-description"
      {...props}
    >
      <DialogTitle sx={styles.title}>{title}</DialogTitle>
      <DialogContent sx={styles.content}>{description}</DialogContent>
      <DialogActions sx={styles.actions}>
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
          <Button variant="contained" onClick={handleClose}>
            Continue
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
