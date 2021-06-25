import React from 'react';
import { Box, BottomNavigation, makeStyles } from '@material-ui/core';
import Manager from './Manager';
import Chatbot from './Chatbot';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'transparent'
  }
});

const Menu = () => {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.root}>
      <Box>
        <Manager />
      </Box>
      <Box>
        <Chatbot />
      </Box>
    </BottomNavigation>
  );
};

export default Menu;
