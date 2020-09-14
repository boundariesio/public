import React, { useState } from 'react';
import Layout from '../components/layout/public';
import Tip from '../components/tip';
import AccountClient from '../services/account-client';
import Button from '../components/Button';

const accountClient = new AccountClient();

export default () => {
  let initialInfo;
  if (typeof window !== 'undefined' && /failed=1/.test(window.location.search)) {
    initialInfo = 'Your login link expired or an error occurred. Please login again.';
  }
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(initialInfo);
  const [email, setEmail] = useState('');
  return (
    <Layout>
      <section id="testimonials" className="py-12 md:py-20 lg:py-40">
        <div className="container text-center mx-auto">
          <h2 className="text-lg sm:text-2xl pb-8">
            Enter the email address associated with your
            <br /> account and a login link will be sent to you
          </h2>
          <form
            id="login"
            className="w-full px-2 max-w-lg mx-auto"
            onSubmit={async e => {
              e.preventDefault();
              setSending(true);
              setError(null);
              try {
                await accountClient.requestSession(email);
                setInfo('A login link has been sent!');
                setSent(true);
                setTimeout(() => {
                  setSent(false);
                  setInfo(null);
                }, 5000);
              } catch (err) {
                console.error(err);
                if (err.response.status === 404) {
                  setError('Could not find an account with that email');
                }
              } finally {
                setSending(false);
              }
            }}
          >
            <div className="flex justify-center">
              {info && (
                <Tip color="indigo" className="text-xs text-indigo-500 pb-4" label="Info:">
                  <p>{info}</p>
                </Tip>
              )}
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
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
                onChange={e => {
                  setEmail(e.target.value);
                  setSent(false);
                }}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="flex justify-center">
              {error && (
                <Tip color="red" className="text-xs text-red-500 pb-4" label="Error:">
                  <p>{error}</p>
                </Tip>
              )}
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <Button className="flex-shrink-0" type="submit" disabled={sending}>
                {sent ? 'Sent!' : 'Send Login Link'}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};
