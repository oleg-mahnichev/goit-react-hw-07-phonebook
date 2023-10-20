import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from '../redux/contactsSlice';
import { setFilter } from '../redux/filterSlice';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { HeaderTitle, ContactsTitle } from './Header.style';
import { persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

export function App() {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const isNameAlreadyExists = name => {
    const lowerCaseName = name.toLowerCase();
    return contacts.some(
      contact => contact.name.toLowerCase() === lowerCaseName
    );
  };

  const addNewContact = newContact => {
    dispatch(addContact(newContact));
  };

  const removeContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  useEffect(() => {}, []);

  return (
    <div className="App">
      <span>
        <HeaderTitle>Телефонна книга</HeaderTitle>
      </span>
      <PersistGate loading={null} persistor={persistor}>
        <ContactForm
          onSubmit={addNewContact}
          isNameAlreadyExists={isNameAlreadyExists}
        />
        <span>
          <ContactsTitle>Контакти</ContactsTitle>
        </span>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={removeContact}
        />
      </PersistGate>
    </div>
  );
}
