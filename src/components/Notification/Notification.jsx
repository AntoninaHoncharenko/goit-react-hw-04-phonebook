import PropTypes from 'prop-types';
import { Message } from './Notification.styled';

export const Notification = ({ filter }) => {
  return <Message>{filter} not found</Message>;
};

Notification.propTypes = {
  filter: PropTypes.string.isRequired,
};
