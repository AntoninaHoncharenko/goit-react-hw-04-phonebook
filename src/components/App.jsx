import { useState } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from 'GlobalStyles';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notification } from './Notification/Notification';
import { Box } from './Box';
import { Title, Subtitle } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  // componentDidMount() {
  //   const savedContacts = localStorage.getItem('savedContacts');
  //   if (savedContacts !== null) {
  //     this.setState({
  //       contacts: JSON.parse(savedContacts),
  //     });
  //   }
  // }

  // componentDidUpdate(_, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem(
  //       'savedContacts',
  //       JSON.stringify(this.state.contacts)
  //     );
  //   }
  // }

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([contact, ...contacts]);
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
