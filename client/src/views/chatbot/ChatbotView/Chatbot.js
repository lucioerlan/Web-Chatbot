import React from 'react';
import { Tooltip } from '@material-ui/core';
import Icon from 'src/assets/images/menu/mix-bot.png';
import { FabButton } from './styled';
import { WindowOpen } from './components/WindowOpen';

const Chatbot = () => {
  return (
    <Tooltip title="Chatbot" aria-label="Chatbot">
      <FabButton onClick={WindowOpen}>
        <img width="55" height="55" src={Icon} alt="chatbot icon" />
      </FabButton>
    </Tooltip>
  );
};

export default Chatbot;
