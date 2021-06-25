import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { visitorTime } from 'src/utils/dates';
import Options from 'src/options';
import { Content } from './styled';

const Home = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Options />

      <Typography color="textPrimary" variant="h4">
        <Content>{visitorTime()}</Content>
      </Typography>
    </Box>
  );
};

export default Home;
