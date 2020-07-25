import React, { useEffect, useState } from 'react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import Modal from './modal';
import plans from '../data/plans';

export default () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/shell.js';
    script.async = true;
    script.onload = () => {
      Object.entries(plans).forEach(([key, plan]) => {
        hbspt.forms.create({
          portalId: '7630203',
          formId: plan.formId,
          target: `#plan-${key}`,
          onFormSubmit: _ => {
            trackCustomEvent({
              category: 'signup',
              action: 'submit',
              label: key,
              value: plan.price
            });
          }
        });
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const modals = {};
  Object.keys(plans).forEach(key => {
    const [isOpen, setOpen] = useState(false);
    modals[key] = {
      isOpen,
      setOpen
    };
  });
  return (
    <>
      <h1 className="text-center text-4xl text-black font-medium leading-snug tracking-wider">
        Pricing
      </h1>
      <p className="text-center text-lg text-gray-700 mt-2 px-6">
        We offer the following plans for API Access. Need additional features or capacity? Send us a
        message and we&apos;ll be happy to work with you.
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
              <div key={key} className={containerClass}>
                {standard ? (
                  <div className="text-sm leading-none rounded-t bg-primary text-white font-semibold uppercase py-4 text-center tracking-wide">
                    Most Popular
                  </div>
                ) : (
                  ''
                )}
                <div className="bg-white text-black rounded shadow-inner shadow-lg overflow-hidden">
                  <div className="block text-left text-sm sm:text-md max-w-sm mx-auto mt-8 text-black px-8 lg:px-6">
                    <h1 className="text-lg font-medium uppercase p-3 pb-0 text-center tracking-wide">
                      {details.name}
                    </h1>
                    {standard ? (
                      <h2 className="text-center pb-8">
                        <sup style={{ top: '-1em' }} className="text-lg inline-block">
                          $
                        </sup>
                        <span className="text-5xl">{details.priceDisplay}</span> /mo
                      </h2>
                    ) : (
                      <h2 className="text-lg text-gray-700 text-center pb-8">
                        <sup style={{ top: '-0.1em' }} className="text-sm inline-block">
                          {details.priceDisplay === 'FREE' ? '' : '$'}
                        </sup>
                        {details.priceDisplay} {details.priceDisplay === 'FREE' ? '' : '/mo'}
                      </h2>
                    )}

                    {details.description}
                  </div>

                  <div className="flex flex-wrap mt-6 px-6">
                    <ul>
                      {details.features.map(item => (
                        <li key={item} className="flex items-center">
                          <div className="rounded-full p-2 fill-current text-green-700">
                            <svg
                              className="w-6 h-6 align-middle"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          </div>
                          <span className="text-gray-700 text-lg sm:text-sm md:text-sm lg:text-base ml-3">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="block flex items-center mt-6 uppercase">
                    <button
                      onClick={() => modals[key].setOpen(true)}
                      type="button"
                      className={`text-lg font-semibold
	w-full text-white rounded rounded-t-none
	px-6 py-4 block shadow-xl bg-${standard ? 'primary' : 'secondary'} hover:bg-${
                        standard ? 'primary-darker' : 'secondary-darker'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {Object.keys(plans).map(key => (
            <Modal key={key} open={modals[key].isOpen} onClose={() => modals[key].setOpen(false)}>
              <h1 className="text-3xl mb-8">Register for API Access</h1>
              <hr className="py-4" />
              <h2 className="font-semibold pb-4">
                Please use the form below to register for{' '}
                <span className="font-medium uppercase px-1 pb-0 text-center tracking-wide">
                  {plans[key].name}
                </span>
                level access.
              </h2>
              <p className="pb-4">
                {plans[key].price > 0
                  ? `After registration, a secure checkout form will be sent to you.
                  Upon payment, you will receive an API access key. If you have requests for
                  data that we currently do not offer, please add them
                  to the message field.`
                  : `After registration, an API key will be sent to you. If you have requests for data
                  that we currently do not offer, please add them to the message field.`}
              </p>
              <div id={`plan-${key}`} className="mb-12" />
            </Modal>
          ))}
        </div>
      </div>
    </>
  );
};
