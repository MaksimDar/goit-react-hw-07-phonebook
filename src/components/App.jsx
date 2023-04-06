import React, { useEffect } from 'react';
import ContactsForm from '../components/Form';
import Filter from '../components/Filter';
import MemoizedContactList from '../components/ContactsList';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import {
  selectContacts,
  selectError,
  selectIsLoading,
  selectFilter,
} from 'redux/selectors';

const filterContacts = (contacts, filter) =>
  contacts.filter(el => el.name.toLowerCase().includes(filter));

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const filteredContacts = filterContacts(contacts, filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Typography
        variant="h3"
        variantMapping={{ h3: 'h1' }}
        gutterBottom
        align="center"
      >
        Phonebook
      </Typography>

      <ContactsForm />

      {isLoading && !error && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {!isLoading && error && <div>Error</div>}

      {!isLoading && (contacts.length > 1 || filter !== '' ? <Filter /> : null)}

      {!isLoading && contacts.length > 0 && (
        <MemoizedContactList contacts={filteredContacts} />
      )}
    </React.Fragment>
  );
}
