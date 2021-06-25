import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Manager from './Manager';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}));

const ManagerView = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <Page className={classes.root}>
      <Container maxWidth={false}>
        <Manager open={open} onClose={onClose} />
      </Container>
    </Page>
  );
};

export default ManagerView;
