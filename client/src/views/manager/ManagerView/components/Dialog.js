import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  SnackbarContent
} from '@material-ui/core';
import { red, green, amber } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import api from 'src/services/api';
import Textfields from './Textfields';

const useStyles = makeStyles(() => ({
  success: {
    backgroundColor: green[800]
  },
  error: {
    backgroundColor: red[600]
  },
  warning: {
    backgroundColor: amber[600]
  },
  formControl: {
    margin: 20,
    width: 210,
  }
}));

const Users = ({ open, onClose }) => {
  const classes = useStyles();
  const [alert, setAlert] = useState({ message: null, variant: null });
  const [openModal, setOpen] = useState(open);
  const [state, setState] = useState({
    activate: '',
    input: '',
    output: ''
  });

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setTimeout(() => setAlert({ message: null, variant: null }), 4000);

    try {
      await api.post('/store-chatbot', state);

      setAlert({
        message: 'Success in adding Question!',
        variant: 'success'
      });

      setTimeout(() => handleClose(), 2000);
    } catch (err) {
      setAlert({
        message: 'Error saving!',
        variant: 'error'
      });
    }
  };

  const MySnackbar = () => (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      open={!!alert.message}
    >
      <SnackbarContent
        className={classes[alert.variant]}
        message={alert.message}
      />
    </Snackbar>
  );

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: submitHandler
        }}
      >
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent>
          <Textfields
            setState={setState}
            state={state}
            formControl={classes.formControl}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <MySnackbar />
    </>
  );
};

export default Users;
