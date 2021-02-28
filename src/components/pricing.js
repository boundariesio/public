import React, { useEffect, useState } from 'react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import { loadStripe } from '@stripe/stripe-js';
import $ from 'jquery';
import { Elements } from '@stripe/react-stripe-js';
import Modal from './modal';
import plans from '../data/plans';
import RegistrationForm from './registration-form';
import PlanCard from './plan-card';

const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

if (typeof window !== 'undefined') {
  window.jQuery = $;
  window.$ = $;
}

export default () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/shell.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [isOpen, setOpen] = useState(false);
  const [chosenKey, setChosenKey] = useState(null);

  return (
    <>
      <Elements stripe={stripePromise}>
        <h1 className="text-center text-4xl text-black font-medium leading-snug tracking-wider">
          Pricing
        </h1>
        <p className="text-center text-lg text-gray-700 mt-2 px-6">
          We offer the following plans for API Access. Need additional features or capacity? Send us
          a message and we&apos;ll be happy to work with you.
        </p>
        <div className="h-1 mx-auto bg-primary w-24 opacity-75 mt-4 rounded" />
        <div className="max-w-full md:max-w-6xl mx-auto my-2 md:px-8 py-6">
          <div className="relative block flex flex-col md:flex-row items-center">
            {Object.entries(plans).map(([key, details], i) => {
              const standard = key === 'standard';
              let containerClass;
              if (standard) {
                containerClass =
                  'w-full max-w-md sm:w-2/3 lg:w-1/3 sm:my-5 my-8 relative z-10 bg-white rounded shadow-lg';
              } else {
                containerClass =
                  'w-11/12 max-w-sm sm:w-3/5 lg:w-1/3 sm:my-5 my-8 relative z-0 bg-white rounded shadow-lg';
              }
              if (i === 0) {
                containerClass += ' md:-mr-3 md:ml-3';
              } else if (i === 2) {
                containerClass += ' md:-ml-3 md:mr-3';
              }
              return (
                <PlanCard key={key} plan={details} containerClass={containerClass}>
                  <button
                    onClick={() => {
                      setOpen(true);
                      setChosenKey(key);
                    }}
                    type="button"
                    className={`text-lg font-semibold
	w-full text-white rounded rounded-t-none
	px-6 py-4 block shadow-xl bg-${standard ? 'primary' : 'secondary'} hover:bg-${
                      standard ? 'primary-darker' : 'secondary-darker'
                    }`}
                  >
                    Select
                  </button>
                </PlanCard>
              );
            })}
            {plans[chosenKey] && (
              <Modal open={isOpen && chosenKey} onClose={() => setOpen(false)}>
                <h3 className="text-xl mb-2">Register for {plans[chosenKey].name} API Access</h3>
                <hr className="py-2" />
                <RegistrationForm plan={plans[chosenKey]} />
                {/* <p className="pb-4">
                {plans[chosenKey].price > 0
                  ? `After registration, a secure checkout form will be sent to you.
                  Upon payment, you will receive an API access key. If you have requests for
                  data that we currently do not offer, please add them
                  to the message field.`
                  : `After registration, an API key will be sent to you. If you have requests for data
                  that we currently do not offer, please add them to the message field.`}
              </p> */}
              </Modal>
            )}
          </div>
        </div>
      </Elements>
    </>
  );
};
