import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import Header from './Header';
import favicon from '../../img/favicon.png';
import faviconLight from '../../img/favicon-light.png';
import CookieConsent from 'react-cookie-consent';

const makeFavicon = () => {
  let src = favicon;
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme:dark)')
  ) {
    src = faviconLight;
  }
  return <link rel="icon" type="image/svg" href={src} />;
};

const Layout = ({ children }) => {
  return (
    <>
      <Helmet title="boundaries.io" defer={false}>
        <meta charSet="utf-8" />
        <title>boundaries.io - boundaries made easy</title>
        <link rel="canonical" href="https://boundaries.io" />
        {makeFavicon()}
      </Helmet>
      <Header />
      <main className="text-gray-900">{children}</main>
      <Footer />
      <CookieConsent
        location="bottom"
        buttonText="Okay"
        cookieName="gatsby-gdpr-google-analytics"
        style={{ background: '#2A3E47' }}
        buttonStyle={{
          borderRadius: '0.25em',
          backgroundColor: '#7493a4',
          color: 'white',
          fontSize: '1rem',
        }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
};

export default Layout;
