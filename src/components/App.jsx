import { Component } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from 'GlobalStyles';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Notification } from './Notification/Notification';
import { Box } from './Box';
import { Title, Subtitle } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('savedContacts');
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        'savedContacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  addContact = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilterChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <Box width="480px" m="0 auto" p="30px">
        <Title>Phonebook</Title>
        <ContactForm
          onSubmit={this.addContact}
          contacts={this.state.contacts}
        />
        <Subtitle>Contacts</Subtitle>
        <Filter onChange={this.handleFilterChange} filter={this.state.filter} />
        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        ></ContactList>
        {filteredContacts.length < 1 && (
          <Notification filter={this.state.filter} />
        )}

        <GlobalStyle />
      </Box>
    );
  }
}
