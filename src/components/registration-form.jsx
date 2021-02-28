import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import Button from './Button';
import Tip from './tip';
import PlanCard from './plan-card';
import AccountClient from '../services/account-client';

const accountClient = new AccountClient();

const propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    productId: PropTypes.string.isRequired
  }).isRequired
};

const RegistrationForm = ({ plan }) => {
  const { productId, priceId } = plan;
  const [sending, setSending] = useState(false);
  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zip, setZip] = useState('');
  const [error, setError] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const handleSubmit = async event => {
    event.preventDefault();
    setError(null);
    setSending(true);

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
        productId,
        priceId
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
      <form id="signup" className="py-3 px-2" onSubmit={handleSubmit}>
        <p className="mb-4">Please fill out the form below to register for API access.</p>
        <div className="flex my-6">
          <div className="w-full md:w-1/2">
            <div className="mb-6 flex">
              <div className="w-1/2 pr-3">
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
              <div className="w-1/2">
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
            <div className="flex mb-6">
              <div className="w-2/3 pr-3">
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
              <div className="w-1/3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="zip"
                >
                  ZIP Code
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="zip"
                  name="zip"
                  type="text"
                  required
                  value={zip}
                  onChange={e => setZip(e.target.value)}
                  placeholder="e.g. 10002"
                />
              </div>
            </div>
            <div className="flex py-4">
              <div className="">
                <Tip color="indigo" className="text-xs" label="Note:">
                  <p>
                    In submitting this form, you acknowledge you have read and agreed to our{' '}
                    <a href="/terms">Terms and Conditions</a> and{' '}
                    <a href="/privacy">Privacy Policy</a>. You can upgrade{' '}
                    {plan.price > 0 ? ' or cancel' : ''} your access at any time. Send a message to
                    support@boundaries.io or sign into use the billing portal to manage your
                    subscription.
                  </p>
                </Tip>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 px-3">
            <span className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Selected Plan
            </span>
            <PlanCard key={productId} plan={plan} description={false} />
          </div>
        </div>
        <div className="flex w-full justify-center">
          {error && (
            <Tip color="red" className="text-xs text-red-500 pb-4" label="Error:">
              <p>
                Uh oh. Something went wrong when submitting your information. Please try again.
                <br />
                Message: {error.response?.data?.error || error.response?.data || error.message}
              </p>
            </Tip>
          )}
          {successful && (
            <Tip color="green" className="font-semibold pb-4" label="Registration Complete:">
              <p>Your API key is on the way! Please check your email inbox.</p>
            </Tip>
          )}
        </div>
        <div className="flex justify-center">
          <br />
          <Button
            type="submit"
            className={`w-1/2 ${
              !valid || sending || successful ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!valid || sending || successful}
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
