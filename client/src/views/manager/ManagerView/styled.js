import { styled } from '@material-ui/styles';

export const Formtyle = styled('form')({
  margin: '0 auto',
  padding: '0px',
  maxWidth: '730px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  '@media(max-width: 800px)': {
    margin: '0%',
    padding: '30px'
  },
  '@media(max-width: 400px)': {
    width: '85px',
    height: '85px',
    marginTop: '-25px'
  }
});
