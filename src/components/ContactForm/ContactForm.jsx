import { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { ContactLabel, ContactInput, AddBtn } from './ContactForm.styled';

export class ContactForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { contacts } = this.props;
    const { name } = this.state;
    event.preventDefault();

    if (contacts.find(contact => contact.name === name)) {
      window.alert(`${name} is already in contacts`);
    } else {
      this.props.onSubmit(this.state);
      this.setState({
        name: '',
        number: '',
      });
    }
  };

  render() {
    return (
      <Box
        onSubmit={this.handleSubmit}
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
            value={this.state.name}
            onChange={this.handleChange}
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
            value={this.state.number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Box>
        <AddBtn type="submit">Add contact</AddBtn>
      </Box>
    );
  }
}
