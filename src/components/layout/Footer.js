import React from 'react';

const Footer = () => (
  <footer className="container mx-auto py-16 px-3 mt-48 mb-8 text-gray-800">
    <div className="flex align-center -mx-3">
      <div className="flex-1 px-3">
        <h2 className="text-lg font-semibold">About Us</h2>
        <p className="mt-5">
          We're passionate about creating value from data and we want to help you create value, too.
        </p>
        <p>
          <small>© {new Date().getFullYear()}</small>
        </p>
      </div>
      <div className="invisible flex-1 px-3">
        <h2 className="text-lg font-semibold">Important Links</h2>
        <ul className="mt-4 leading-loose">
          <li>
            <a href="/terms">Terms &amp; Conditions</a>
          </li>
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
        </ul>
      </div>
      <div className="flex-1 px-3">
        <h2 className="text-lg font-semibold">Social</h2>
        <ul className="mt-4 leading-loose">
          <li>
            <a href="https://twitter.com/jbielick">Twitter</a>
          </li>
          <li>
            <a href="https://github.com/boundariesio">GitHub</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
