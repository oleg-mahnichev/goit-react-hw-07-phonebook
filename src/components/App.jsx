import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ContactForm, submit } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { StyledDiv, ContactsTitle, HeaderTitle } from './Header.style';
import { useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from '../redux/operations';
import { changeFilter } from '../redux/filterSlice';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const onSubmitContact = evt => {
    evt.preventDefault();
    submit(evt, dispatch);
  };

  const onChangeInput = evt => {
    dispatch(changeFilter(evt.target.value));
  };
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);
  const filterByName = () => {
    return contacts.filter(contact =>
      contact.name.toUpperCase().includes(filter.toUpperCase())
    );
  };
  const deletingContact = evt => {
    dispatch(deleteContact(evt.target.id));
  };
  return (
    <StyledDiv>
      <HeaderTitle>Phonebook</HeaderTitle>
      <ContactForm formSubmit={onSubmitContact} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter input={onChangeInput} />
      <ContactList
        contacts={contacts}
        filter={filter}
        filtering={filterByName}
        deleting={deletingContact}
      />
    </StyledDiv>
  );
};
