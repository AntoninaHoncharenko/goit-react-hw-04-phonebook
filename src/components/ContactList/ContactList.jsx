import PropTypes, { object } from 'prop-types';
import { Contact } from '../ContactItem/ContactItem';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {contacts.map(({ name, number, id }) => {
        return (
          <Contact
            key={id}
            name={name}
            number={number}
            id={id}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(object),
  onDelete: PropTypes.func.isRequired,
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
