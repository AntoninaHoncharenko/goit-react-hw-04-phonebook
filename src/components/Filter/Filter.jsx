import PropTypes from 'prop-types';
import { Box } from '../Box';
import { FindLabel, FindInput } from './Filter.styled';

export const Filter = ({ onChange, filter }) => {
  return (
    <Box display="flex" flexDirection="column" mb="20px">
      <FindLabel htmlFor="text">Find contacts by name</FindLabel>
      <FindInput type="text" value={filter} id="text" onChange={onChange} />
    </Box>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
