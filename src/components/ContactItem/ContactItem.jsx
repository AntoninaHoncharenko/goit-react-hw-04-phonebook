import PropTypes from 'prop-types';
import { ContactItem } from './ContactItem.styled';
import { Box } from 'components/Box';
import { ContactName, ContactNumber, DeleteBtn } from './ContactItem.styled';

export const Contact = ({ name, number, id, onDelete }) => {
  return (
    <ContactItem>
      <Box>
        <ContactName>{name}</ContactName>
        <ContactNumber>{number}</ContactNumber>
      </Box>
      <DeleteBtn type="button" onClick={() => onDelete(id)}>
        Delete
      </DeleteBtn>
    </ContactItem>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
