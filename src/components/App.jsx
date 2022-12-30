import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from 'GlobalStyles';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notification } from './Notification/Notification';
import { Box } from './Box';
import { Title, Subtitle } from './App.styled';

export const App = () => {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('savedContacts')) ?? initialContacts;
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('savedContacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevState => [contact, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const handleFilterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <Box width="480px" m="0 auto" p="30px">
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} contacts={contacts} />
      <Subtitle>Contacts</Subtitle>
      <Filter onChange={handleFilterChange} filter={filter} />
      <ContactList
        contacts={filteredContacts}
        onDelete={deleteContact}
      ></ContactList>
      {filteredContacts.length < 1 && <Notification filter={filter} />}

      <GlobalStyle />
    </Box>
  );
};
