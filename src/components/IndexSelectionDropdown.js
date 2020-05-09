import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';  
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CURRENT_SELECTED_INDEX } from '../constants'
import { isEmpty } from 'lodash'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const IndexSelectionDropdown = () =>
{
  const classes = useStyles();

  const dispatch = useDispatch();
  var tmpIndex = useSelector(state => state.currentSelectedIndex)
  const selectedIndex = isEmpty(tmpIndex)? '' : tmpIndex

  const dispatchIndexChange = (payload) => dispatch({ type: ADD_CURRENT_SELECTED_INDEX, payload})

  const handleChange = (event) => {
    dispatchIndexChange(event.target.value);
  };

  return(
    <FormControl className={classes.formControl}>
      <InputLabel id="index-selection">Index</InputLabel>
      <Select
        labelId="index-selection"
        id="index-selection"
        value={selectedIndex}
        onChange={handleChange}
        label="Nifty Index"
      >
        <MenuItem value=''><em>Select</em></MenuItem>
        <MenuItem value={'nifty50'}>Nifty 50</MenuItem>
        <MenuItem value={'bankNifty'}>Bank Nifty</MenuItem>
      </Select>
    </FormControl>
  )
}