import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Home from './Home';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}));

const CustomerListView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Home">
      <Box width={1} py="20px" flexWrap="wrap" boxSizing="border-box">
        <Home />
      </Box>
    </Page>
  );
};

export default CustomerListView;
