import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import CookieConsent from 'react-cookie-consent';
import Footer from './Footer';
import Header from './Header';
import favicon from '../../img/favicon.png';
import faviconLight from '../../img/favicon-light.png';
import socialImg from '../../img/social.jpg';

const makeFavicon = () => {
  let src = favicon;
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme:dark)')
  ) {
    src = faviconLight;
  }
  return <link rel="icon" type="image/png" href={src} />;
};

const Layout = ({ children, home }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'hs-script-loader';
    script.src = '//js.hs-scripts.com/7630203.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <Helmet title="boundaries.io" defer={false}>
        <meta charSet="utf-8" />
        <title>boundaries.io - boundaries made easy</title>
        <meta name="og:image" content={socialImg} />
        <meta
          name="description"
          content="You query, we deliver. Get accurate GeoJSON features for adminstrative, municipal, and social geographic boundaries."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://boundaries.io" />
        {makeFavicon()}
      </Helmet>
      <Header home={home} />
      <main className="text-gray-900">{children}</main>
      <Footer />
      <CookieConsent
        location="top"
        buttonText="Accept"
        cookieName="gatsby-gdpr-google-analytics"
        style={{ background: '#FFFFFF', color: '#2A3E47' }}
        buttonStyle={{
          borderRadius: '0.25em',
          backgroundColor: '#7493a4',
          color: 'white',
          fontSize: '1rem'
        }}
        expires={150}
      >
        <p>
          This website stores cookies on your computer. These cookies are used to improve your
          website experience and provide more personalized services to you, both on this website and
          through other media.
          {/* To find out more about the cookies we use, see our Privacy Policy. */}
        </p>
        <p>
          We won't track your information when you visit our site. But in order to comply with your
          preferences, we'll have to use just one tiny cookie so that you're not asked to make this
          choice again.
        </p>
      </CookieConsent>
    </>
  );
};

export default Layout;
