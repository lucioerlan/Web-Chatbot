import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0
    },
    html: {
      height: '100%',
      width: '100%'
    },
    body: {
      backgroundColor: '#f4f6f8',
      height: '100%',
      width: '100%',
      fontFamily:
          '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue ,sans-serif'
    },
    a: {
      textDecoration: 'none'
    },
    '#root': {
      height: '100%',
      width: '100%'
    },
    '@keyframes fall': {
      from: { transform: 'translateY(-200px)' },
      to: { transform: 'translateY(0px)' }
    },
    '@keyframes left': {
      from: { transform: 'translateX(-600px)' },
      to: { transform: 'translateX(0px)' }
    },
    '@keyframes show': {
      '0%': {
        display: ' none',
        opacity: 0
      },
      '1%': {
        display: ' block',
        opacity: 0
      },
      '100%': {
        display: 'block',
        opacity: 1
      }
    }
  }
}));

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
