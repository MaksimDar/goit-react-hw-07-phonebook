import React, { useMemo } from 'react';
import {
  Stack,
  colors,
  IconButton,
  ListItemText,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteContact } from 'redux/contacts/contactsSlice';
import { deleteContact } from 'redux/operations';
import { selectContacts, selectFilter } from 'redux/selectors';

const style = {
  boxShadow: 1,
  borderRadius: 2,
  border: '1px solid lightgray',
  p: 2,
  minWidth: 350,
  maxWidth: 500,
  alignItems: 'center',
  padding: 0,
};

const getFilteredContacts = (contacts, filterValue) =>
  contacts.filter(contact => contact.name.toLowerCase().includes(filterValue));

const MemoizedContactList = React.memo(() => {
  const dispatch = useDispatch();

  const handleDelete = id => dispatch(deleteContact(id));

  const contactsRedux = useSelector(selectContacts);

  const filterValue = useSelector(selectFilter);

  const contactsArr = useMemo(
    () => getFilteredContacts(contactsRedux, filterValue),
    [contactsRedux, filterValue]
  );

  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="center">
      <List sx={style} aria-label="contacts">
        {contactsArr.map(({ name, phone, id }) => {
          return (
            <ListItem
              key={id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar size="small" sx={{ bgcolor: colors.green[500] }}>
                  <FaceIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} secondary={phone} />
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
});

export default MemoizedContactList;
