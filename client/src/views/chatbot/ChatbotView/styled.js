import { styled } from '@material-ui/styles';
import { Fab } from '@material-ui/core';

export const FabButton = styled(Fab)({
  position: 'fixed',
  bottom: 32,
  right: 32,
  borderRadius: '50%',
  cursor: 'pointer',
  boxShadow:
    '0px 3px 16px 0px rgba(0, 0, 0, 0.6), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)'
});
