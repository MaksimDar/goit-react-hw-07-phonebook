import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFilterValue } from 'redux/filter/filterSlice';

function Filter() {
  const dispatch = useDispatch();

  const setFilterData = useCallback(
    e => {
      const { value } = e.currentTarget;
      const valueLowerCase = value.toLowerCase();
      dispatch(setFilterValue(valueLowerCase));
    },
    [dispatch]
  );

  return (
    <FormControl
      sx={{
        minWidth: '350px',
        maxWidth: '500px',
        gap: '10px',
        margin: '0 auto',
      }}
    >
      <TextField
        id="outlined-basic"
        label="Filter"
        variant="outlined"
        type="search"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        onChange={setFilterData}
      />
    </FormControl>
  );
}

export default React.memo(Filter);
