import PropTypes from 'prop-types';

const ListItemWithBorder = ({ children }) => {
    return (
      <li style={{border: "1px solid rgb(3, 0, 47)", 
        paddingBottom: "5px", 
        marginBottom: "4px", 
        marginRight: "14px", 
        borderRadius: "3px"
      }}>
        {children}
      </li>
    );
  };

  ListItemWithBorder.propTypes = {
    children: PropTypes.node.isRequired
  };

export default ListItemWithBorder;
