import React from 'react';
import { Link } from 'gatsby';

const Footer = () => (
  <footer className="container mx-auto py-3 md:py-12 px-3 mt-20 mb-8 text-gray-800">
    <div className="flex align-center -mx-3">
      <div className="flex-1 px-3">
        <h2 className="text-lg font-semibold">About Us</h2>
        <p className="mt-5">
          Brought to you by bitmode.
          <br />
          We&apos;re passionate about creating value from data and we want to help you create value,
          too.
        </p>
        <p>
          <small>&copy; bitmode, LLC {new Date().getFullYear()}</small>
        </p>
      </div>
      <div className="flex-1 px-3">
        <h2 className="text-lg font-semibold">Social</h2>
        <ul className="mt-4 leading-loose">
          <li>
            <a href="https://twitter.com/bitmode_xyz">Twitter</a>
          </li>
          <li>
            <a href="https://github.com/boundariesio">GitHub</a>
          </li>
        </ul>
      </div>
      <div className="flex-1 px-3">
        <h2 className="text-lg font-semibold">Legal</h2>
        <ul className="mt-4 leading-loose">
          <li>
            <Link to="/terms">Terms and Conditions</Link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
