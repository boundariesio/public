export default {
  hobby: {
    name: 'Starter',
    priceDisplay: '10',
    price: 0,
    productId: process.env.HOBBY_ID,
    description:
      'Get full access to build your Proof of Concept, test an idea, or use the data on a personal project.',
    features: ['3-day Trial Period', 'Up to 100 API calls per day', 'Upgrade at any time'],
    formId: 'a8343c12-3395-45f4-923a-97eb019c6c6c'
  },
  standard: {
    name: 'Standard',
    priceDisplay: '29',
    price: 1900,
    productId: process.env.STANDARD_ID,
    description:
      "Ready to use this API in production? We've got you. Subscribe to standard and make sure things are always running smoothly.",
    features: [
      'Access to the most up-to-date data and premium API',
      'Standard support',
      '1K requests per day',
      'Upgrade at any time'
    ],
    formId: '620bf43e-a2bf-4c71-86a8-ed53d5b236fa'
  },
  premium: {
    name: 'Business',
    priceDisplay: '99',
    productId: process.env.BUSINESS_ID,
    price: 9900,
    description:
      'Your uptime is our uptime. Get premium support and top-tier access for businesses and production applications with lots of usage.',
    features: [
      'Access to the most up-to-date data and premium API',
      'Premium Support',
      '100K requests per day'
    ],
    formId: 'c4e48a0b-4904-4a7f-8825-bf846cd152a0'
  }
};
