import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import LogoText from '../../svg/LogoText';
import Button from '../Button';

const PricingLink = ({ children }) => (
  <AnchorLink offset={40} className="px-4" offset={40} href="#pricing">
    {children}
  </AnchorLink>
);

const Header = ({ home }) => {
  return (
    <header className="sticky top-0 bg-white shadow z-20">
      <div className="container flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8">
        <div className="flex items-center">
          <div className="w-56 sm:w-40">
            <a href="/">
              <LogoText />
            </a>
          </div>
        </div>
        <div className="flex mt-4 sm:mt-0">
          {home ? (
            <AnchorLink offset={40} className="px-4" href="#features">
              Features
            </AnchorLink>
          ) : (
            <a className="px-4" href="/#features">
              Features
            </a>
          )}{' '}
          {home ? (
            <PricingLink>Pricing</PricingLink>
          ) : (
            <a className="px-4" href="/#pricing">
              Pricing
            </a>
          )}{' '}
          <a className="px-4 hidden md:inline-block" href="/docs">
            API Docs
          </a>{' '}
          {home ? (
            <AnchorLink offset={40} className="px-4" href="#support">
              Support
            </AnchorLink>
          ) : (
            <a className="px-4" href="/#support">
              Support
            </a>
          )}
        </div>
        <div className="hidden md:block">
          {home ? (
            <PricingLink>
              <Button className="text-sm">Get an API key</Button>
            </PricingLink>
          ) : (
            <a className="px-4" href="/#pricing">
              <Button className="text-sm">Get an API key</Button>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
