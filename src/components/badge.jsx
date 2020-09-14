import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

const Badge = ({ color, children }) => {
  return (
    <span className={`bg-${color}-100 py-1 px-1 rounded text-${color}-500 align-middle`}>
      {children}
    </span>
  );
};

Badge.propTypes = propTypes;

export default Badge;
