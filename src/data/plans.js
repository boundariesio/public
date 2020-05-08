export default {
  hobby: {
    name: 'Hobby',
    priceDisplay: 'FREE',
    price: 0,
    description:
      'Get full access to build your Proof of Concept, test an idea, or use the data on a personal project.',
    features: [
      'No credit card required',
      'Get an API key immediately',
      'Up to 100 API calls per day',
    ],
  },
  standard: {
    name: 'Standard',
    priceDisplay: '39',
    price: 1900,
    description:
      "Ready to use this API in production? We've got you. Subscribe to standard and make sure things are always running smoothly.",
    features: ['Standard support', 'Request Priority (QoS)', '1K requests per day'],
  },
  premium: {
    name: 'Premium',
    priceDisplay: '99',
    price: 9900,
    description:
      'Your uptime is our uptime. Get premium support and top-tier access for businesses and production applications with lots of usage.',
    features: ['Premium Support', 'Highest Request Priority (QoS)', '100K requests per day'],
  },
};
