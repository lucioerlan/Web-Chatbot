import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Snackbar,
  SnackbarContent
} from '@material-ui/core';
import { red, green, amber } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import api from 'src/services/api';
import io from 'socket.io-client';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Table from './components/Table';

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
  dialogCustomizedWidth: {
    'max-width': '80%'
  }
}));

const Manager = ({ open, onClose }) => {
  const classes = useStyles();
  const [alert, setAlert] = useState({ message: null, variant: null });
  const [openModal, setOpen] = useState(open);
  const [data, setData] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      const socket = io(process.env.REACT_APP_SOCKET_URL, {
        transports: ['websocket'],
        upgrade: false
      });
      try {
        const res = await api.get('/get-view-chatbot');

        setData(res.data.message);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      socket.once('chatbot', () => {
        fetchData();
      });
    };
    fetchData();
  }, []);

  const handleRowUpdate = async (newData, oldData, resolve) => {
    setTimeout(() => setAlert({ message: null, variant: null }), 4000);
    const { status } = await api.put('/update-chatbot', newData);

    if (status === 200) {
      const dataUpdate = [...data];
      const index = oldData.tableData.ID;
      dataUpdate[index] = newData;
      setData([...dataUpdate]);
      resolve();
      setIserror(false);
      setErrorMessages([]);
      setTimeout(() => {
        setAlert({
          message: 'Question changed successfully!',
          variant: 'success'
        });
      }, 500);
    } else {
      setAlert({
        message: 'Question not changed!',
        variant: 'error'
      });
      setErrorMessages(['Update failed! Server error']);
      setIserror(true);
      resolve();
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
        fullWidth
        classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
        open={openModal}
        onClose={handleClose}
        PaperProps={{
          component: 'form'
        }}
      >
        <DialogActions>
          <IconButton variant="outlined" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent>
          <Table
            data={data}
            iserror={iserror}
            errorMessages={errorMessages}
            handleRowUpdate={handleRowUpdate}
            loading={loading}
            setOpenDialog={setOpenDialog}
            openDialog={openDialog}
            handleDialogClose={handleDialogClose}
          />
        </DialogContent>
      </Dialog>
      <MySnackbar />
    </>
  );
};

export default Manager;
