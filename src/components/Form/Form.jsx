import { useState } from 'react';

import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';

export default function ContactsForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const handleStateChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
        break;

      default:
        return;
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formObj = {
      name: name,
      phone: phone,
    };

    dispatch(addContact(formObj));
    resetForm();
  };

  return (
    <FormControl
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      onChange={handleStateChange}
      sx={{
        minWidth: '350px',
        maxWidth: '500px',
        gap: '10px',
        margin: '0 auto',
      }}
    >
      <TextField
        id="outlined-search"
        label="Full Name"
        name="name"
        type="text"
        value={name}
      />
      <TextField
        id="outlined-search"
        label="Number"
        name="number"
        type="tel"
        value={phone}
      />
      <Button variant="contained" size="small" type="submit">
        Add contact
      </Button>
    </FormControl>
  );
}
