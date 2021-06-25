import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Chatbot from './Chatbot';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}));

const ChatbotView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root}>
      <Container maxWidth={false}>
        <Chatbot />
      </Container>
    </Page>
  );
};

export default ChatbotView;
