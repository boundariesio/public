import React from 'react';
import PropTypes from 'prop-types';
import Plan from './types/plan';

const propTypes = {
  key: PropTypes.string.isRequired,
  plan: Plan.isRequired,
  showDescription: PropTypes.bool,
  containerClass: PropTypes.string,
  children: PropTypes.children
};

const PlanCard = (
  { key, plan, showDescription, containerClass, children } = {
    showDescription: false,
    containerClass: ''
  }
) => {
  const standard = key === 'standard';
  return (
    <div className={containerClass}>
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
            {plan.name}
          </h1>
          {standard ? (
            <h2 className="text-center pb-8">
              <sup style={{ top: '-1em' }} className="text-lg inline-block">
                $
              </sup>
              <span className="text-5xl">{plan.priceDisplay}</span> /mo
            </h2>
          ) : (
            <h2 className="text-lg text-gray-700 text-center">
              <sup style={{ top: '-0.1em' }} className="text-sm inline-block">
                {plan.priceDisplay === 'FREE' ? '' : '$'}
              </sup>
              {plan.priceDisplay} {plan.priceDisplay === 'FREE' ? '' : '/mo'}
            </h2>
          )}
          {showDescription && <p className="pt-4">{plan.description}</p>}
        </div>

        <div className="flex flex-wrap mt-6 px-6">
          <ul>
            {plan.features.map(item => (
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
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg sm:text-sm md:text-sm lg:text-base ml-3">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="block flex items-center mt-6 uppercase">{children}</div>
      </div>
    </div>
  );
};

PlanCard.propTypes = propTypes;

export default PlanCard;
