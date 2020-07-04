import React from 'react';
import PropTypes from 'prop-types';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Link } from 'gatsby';
import LogoText from '../../svg/LogoText';
import Button from '../Button';

const PricingLink = ({ children }) => (
  <AnchorLink offset={40} className="px-4" href="#pricing">
    {children}
  </AnchorLink>
);

PricingLink.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

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
          <Link to="/docs" className="px-4 hidden md:inline-block">
            API Docs
          </Link>{' '}
          <Link to="/explore" className="px-4 hidden md:inline-block">
            Explore
          </Link>
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

Header.propTypes = {
  home: PropTypes.bool
};

Header.defaultProps = {
  home: false
};

export default Header;
