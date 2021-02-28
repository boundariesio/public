const [lowVolumeProductId, lowVolumePriceId] = process.env.LOW_VOLUME_ID.split(':');
const [standardProductId, standardPriceId] = process.env.STANDARD_ID.split(':');
const [businessProductId, businessPriceId] = process.env.BUSINESS_ID.split(':');

export default {
  hobby: {
    name: 'Low Volume',
    priceDisplay: '15',
    price: 1500,
    productId: lowVolumeProductId,
    priceId: lowVolumePriceId,
    description:
      'Get full access to build your Proof of Concept, test an idea, or use the data on a personal project.',
    features: [
      'Free 5-day trial period',
      'Up to 300 API calls per day',
      'Upgrade or cancel at any time'
    ],
    formId: 'a8343c12-3395-45f4-923a-97eb019c6c6c'
  },
  standard: {
    name: 'Standard',
    priceDisplay: '29',
    price: 2900,
    productId: standardProductId,
    priceId: standardPriceId,
    description:
      "Ready to use this API in production? We've got you. Subscribe to standard and make sure things are always running smoothly.",
    features: [
      'Free 5-day trial Period',
      'Access to the most up-to-date data and premium API',
      'Support availabe on request',
      '1K requests per day',
      'Upgrade or cancel at any time'
    ],
    formId: '620bf43e-a2bf-4c71-86a8-ed53d5b236fa'
  },
  premium: {
    name: 'Business',
    priceDisplay: '79',
    productId: businessProductId,
    priceId: businessPriceId,
    price: 7900,
    description:
      'Your uptime is our uptime. Get premium support and top-tier access for businesses and production applications with lots of usage.',
    features: [
      'Free 5-day trial period',
      'Access to the most up-to-date data and premium API',
      'Premium technical support',
      '100K requests per day',
      'Highest request throutput',
      'Cancel at any time'
    ],
    formId: 'c4e48a0b-4904-4a7f-8825-bf846cd152a0'
  }
};
