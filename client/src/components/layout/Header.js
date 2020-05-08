import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import LogoText from '../../svg/LogoText';
import Button from '../Button';

const Header = () => (
  <header className="sticky top-0 bg-white shadow z-20">
    <div className="container flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8">
      <div className="flex items-center">
        <div className="w-56 sm:w-40">
          <LogoText />
        </div>
      </div>
      <div className="flex mt-4 sm:mt-0">
        {window.location.pathname === '/' ? (
          <AnchorLink className="px-4" href="#features">
            Features
          </AnchorLink>
        ) : (
          <a className="px-4" href="/#features">
            Features
          </a>
        )}{' '}
        {window.location.pathname === '/' ? (
          <AnchorLink className="px-4" href="#pricing">
            Pricing
          </AnchorLink>
        ) : (
          <a className="px-4" href="/#pricing">
            Pricing
          </a>
        )}{' '}
        <a className="px-4" href="/docs">
          API Documentation
        </a>{' '}
        {window.location.pathname === '/' ? (
          <AnchorLink className="px-4" href="#support">
            Support
          </AnchorLink>
        ) : (
          <a className="px-4" href="/#support">
            Support
          </a>
        )}
      </div>
      <div className="hidden md:block">
        <Button className="text-sm">Get an API key</Button>
      </div>
    </div>
  </header>
);

export default Header;
