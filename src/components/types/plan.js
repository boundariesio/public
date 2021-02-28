import PropTypes from 'prop-types';

export default {
  name: PropTypes.string.isRequired,
  priceDisplay: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  priceId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired
};
