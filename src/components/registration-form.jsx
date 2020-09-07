import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Tip from './tip';
import AccountClient from '../services/account-client';

const accountClient = new AccountClient();

const propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired
};

const RegistrationForm = ({ plan }) => {
  const [sending, setSending] = useState(false);
  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zip, setZip] = useState('');
  const [error, setError] = useState(null);
  useEffect(() => {
    const allPresent =
      firstName.length >= 2 && lastName.length >= 2 && email.length >= 4 && zip.length >= 5;
    setValid(allPresent);
  }, [firstName, lastName, email, zip]);
  return (
    <>
      <p className="pb-4">Fill out the form below to register for API access.</p>
      <Tip color="indigo" className="text-xs" label="Note:">
        <p>
          You can upgrade {plan.price > 0 ? ' or cancel' : ''} your access at any time. Send a
          message to support@boundaries.io or use this site to manage your subscription.
        </p>
      </Tip>
      <form
        className="w-full max-w-lg py-4 mx-auto"
        onSubmit={async e => {
          e.preventDefault();
          setError(null);
          setSending(true);
          try {
            const response = await accountClient.register({
              firstName,
              lastName,
              email,
              zip
            });
          } catch (error) {
            setError(error);
            console.error(error);
          } finally {
            setSending(false);
          }
        }}
      >
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
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="zip"
              type="text"
              required
              value={zip}
              onChange={e => setZip(e.target.value)}
              placeholder="12345"
            />
          </div>
        </div>
        <div className="text-xs pb-4">
          <p>
            In submitting this form, you acknowledge you have read and agreed to our{' '}
            <a href="/terms">Terms and Conditions</a> and <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>
        {error && (
          <Tip color="red" className="text-xs text-red-500" label="Error:">
            <p>
              Uh oh. Something went wrong when submitting your information. Please try again.
              <br />
              Message: {error.message}
            </p>
          </Tip>
        )}
        <div className="flex">
          <Button
            type="submit"
            className={`${!valid || sending ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!valid || sending}
          >
            Register
          </Button>
        </div>
      </form>
    </>
  );
};

RegistrationForm.propTypes = propTypes;

export default RegistrationForm;
