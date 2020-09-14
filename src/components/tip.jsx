import React from 'react';
import PropTypes from 'prop-types';
import Badge from './badge';

const propTypes = {};

const Tip = ({ label, color, children, className }) => {
  return (
    <div className={`flex pb-4 ${className}`}>
      <div className="mr-1">
        <Badge color={color}>{label}</Badge>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

Tip.propTypes = propTypes;

export default Tip;
