import React from 'react';
import PropTypes from 'prop-types';
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core';

const Textfields = ({ setState, state, formControl }) => (
  <>
    <FormControl required className={formControl} variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">Activate</InputLabel>
      <Select
        value={state.activate}
        onChange={(e) => setState({ ...state, activate: e.target.value })}
        color="primary"
        label="Activate"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      >
        <MenuItem value="0">Not in use</MenuItem>
        <MenuItem value="1">In use</MenuItem>
      </Select>
    </FormControl>
    <TextField
      required
      value={state.input}
      label="Input"
      style={{ margin: 20 }}
      type="text"
      color="primary"
      margin="normal"
      variant="outlined"
      inputProps={{
        maxLength: 200
      }}
      onChange={(e) => setState({ ...state, input: e.target.value })}
    />

    <TextField
      required
      value={state.output}
      label="Output"
      style={{ margin: 20 }}
      type="text"
      color="primary"
      margin="normal"
      variant="outlined"
      inputProps={{
        maxLength: 200
      }}
      onChange={(e) => setState({ ...state, output: e.target.value })}
    />
  </>
);

Textfields.propTypes = {
  setState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default Textfields;
