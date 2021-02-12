import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import Button from './Button';
import Tip from './tip';
import PlanCard from './plan-card';
import AccountClient from '../services/account-client';

const inputStyles = {
  base: {
    fontSize: '18px',
    lineHeight: '1.25',
    color: '#4a5568',
    '::placeholder': {
      color: '#a0aec0'
    }
  }
};
const accountClient = new AccountClient();

const propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    productId: PropTypes.string.isRequired
  }).isRequired
};

const RegistrationForm = ({ plan }) => {
  const { productId } = plan;
  const [sending, setSending] = useState(false);
  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zip, setZip] = useState('');
  const [error, setError] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async event => {
    event.preventDefault();
    setError(null);
    setSending(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    try {
      trackCustomEvent({
        category: 'signup',
        action: 'submit',
        label: productId,
        value: plan.price / 100
      });
      await accountClient.register({
        firstName,
        lastName,
        email,
        zip,
        productId
      });
      setSuccessful(true);
    } catch (er) {
      setError(er);
      console.error(er);
    } finally {
      setSending(false);
    }
  };
  useEffect(() => {
    const allPresent =
      firstName.length >= 2 && lastName.length >= 2 && email.length >= 4 && zip.length >= 5;
    setValid(allPresent);
  }, [firstName, lastName, email, zip]);
  return (
    <>
      <PlanCard key={productId} plan={plan} containerClass={''} />
      <p className="py-4">Please fill out the form below to register for API access.</p>
      <form id="signup" className="w-full py-4 mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="first-name"
              type="text"
              required
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="last-name"
              type="text"
              required
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-2/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your.email@example.com"
            />
            <p className="text-gray-600 text-xs italic">
              An API key will be sent to the registered email address. We do not sell personal
              information.
            </p>
          </div>
          <div className="w-1/3 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="zip"
            >
              ZIP Code
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="zip"
              type="text"
              required
              value={zip}
              onChange={e => setZip(e.target.value)}
              placeholder="e.g. 10002"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-3/5 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="card-number"
            >
              Card Number
            </label>
            <span className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <CardNumberElement options={{ style: inputStyles }} />
            </span>
          </div>
          <div className="w-1/5 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="exp"
            >
              Card Expiration
            </label>
            <span className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <CardExpiryElement options={{ style: inputStyles }} />
            </span>
          </div>
          <div className="w-1/5 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="cvc"
            >
              Card CVC
            </label>
            <span className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
              <CardCvcElement options={{ style: inputStyles }} />
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          {error && (
            <Tip color="red" className="text-xs text-red-500 pb-4" label="Error:">
              <p>
                Uh oh. Something went wrong when submitting your information. Please try again.
                <br />
                Message:{' '}
                {error.response.data.error ? error.response.data.error : error.response.data}
              </p>
            </Tip>
          )}
          {successful && (
            <Tip color="green" className="font-semibold pb-4" label="Registration Complete:">
              <p>Your API key is on the way! Please check your email inbox.</p>
            </Tip>
          )}
        </div>
        <div className="flex justify-center text-center px-20">
          <Tip color="indigo" className="text-xs" label="Note:">
            <p>
              You can upgrade {plan.price > 0 ? ' or cancel' : ''} your access at any time. Send a
              message to support@boundaries.io or use this site to manage your subscription.
            </p>
          </Tip>
        </div>
        <div className="flex justify-center">
          <p className="text-xs text-right pr-3 pt-2">
            You will be charged monthly for this service. <br /> By submitting this form, you
            acknowledge you have read <br /> and agreed to our{' '}
            <a href="/terms">Terms and Conditions</a> and <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>
        <div className="flex justify-center">
          <br />
          <Button
            type="submit"
            className={`w-1/2 ${
              !valid || sending || successful ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!elements || !stripe || !valid || sending || successful}
          >
            {successful ? 'All set!' : 'Register'}
          </Button>
        </div>
      </form>
    </>
  );
};

RegistrationForm.propTypes = propTypes;

export default RegistrationForm;
