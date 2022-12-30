import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { ContactLabel, ContactInput, AddBtn } from './ContactForm.styled';

export const ContactForm = ({ contacts, onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    if (name === 'name') {
      setName(value);
    }

    if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (contacts.find(contact => contact.name === name)) {
      window.alert(`${name} is already in contacts`);
    } else {
      onSubmit(name, number);
      setName('');
      setNumber('');
    }
  };

  return (
    <Box
      onSubmit={handleSubmit}
      as="form"
      display="flex"
      flexDirection="column"
      width="100%"
      m="0 auto 20px"
    >
      <Box display="flex" flexDirection="column" m="0 auto 10px">
        <ContactLabel htmlFor="name">Name</ContactLabel>
        <ContactInput
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Box>
      <Box display="flex" flexDirection="column" m="0 auto 20px">
        <ContactLabel htmlFor="number">Number</ContactLabel>
        <ContactInput
          type="tel"
          name="number"
          id="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Box>
      <AddBtn type="submit">Add contact</AddBtn>
    </Box>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object.isRequired),
  onSubmit: PropTypes.func.isRequired,
};
