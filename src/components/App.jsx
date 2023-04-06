import React, { useEffect } from 'react';
import ContactsForm from '../components/Form';
import Filter from '../components/Filter';
import MemoizedContactList from '../components/ContactsList';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { getContacts, getError, getIsLoading } from 'redux/selectors/selectors';

const filterContacts = (contacts, filter) =>
  contacts.filter(el => el.name.toLowerCase().includes(filter));

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const contacts = useSelector(getContacts);
  const filter = useSelector(state => state.filter);
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
      {!isLoading && error && <div>Error</div>}

      {contacts.length > 1 || filter !== '' ? <Filter /> : null}

      {!isLoading && contacts.length > 0 && (
        <MemoizedContactList contacts={filteredContacts} />
      )}
    </React.Fragment>
  );
}
