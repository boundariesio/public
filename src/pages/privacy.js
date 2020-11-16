import React from 'react';
import Layout from '../components/layout/public';

export default () => {
  return (
    <Layout>
      <div className="container mx-auto py-5 max-w-4xl">
        <h1 className="text-3xl font-semibold border-b my-4 pb-4">Privacy Policy</h1>
        <small className="italic">Revised as of September 7, 2020</small>
        <p className="py-2">
          THE WEBSITE boundaries.io (THE &quot;SITE&quot;) AND RELATED PLATFORMS, PRODUCTS, AND
          SERVICES AVAILABLE ON OR FROM THE SITE (THE &quot;SERVICES&quot;) ARE OWNED AND OPERATED
          BY Bitmode, LLC. (TOGETHER WITH ITS AFFILIATES, SUCCESSORS, AND ASSIGNS HEREINAFTER
          REFERRED TO AS &quot;<span className="underline">OUR</span>&quot;, &quot;
          <span className="underline">WE</span>&quot;, OR &quot;
          <span className="underline">US</span>&quot;).
        </p>
        <p className="py-2">
          Bitmode, LLC is committed to protecting and respecting your privacy, and we’ll only use
          your personal information to administer your account and to provide the products and
          services you requested from us.
        </p>
        <p className="py-2">
          From time to time, we would like to contact you about our products and services, as well
          as other content that may be of interest to you. If you consent to us contacting you for
          this purpose, please tick below to say how you would like us to contact you: I agree to
          receive other communications from Bitmode, LLC. You can unsubscribe from these
          communications at any time.
        </p>
        <p className="py-2">
          For more information on how to unsubscribe, our privacy practices, and how we are
          committed to protecting and respecting your privacy, please review our Privacy Policy. By
          clicking submit below, you consent to allow Bitmode, LLC to store and process the personal
          information submitted above to provide you the content requested.
        </p>
        <p className="py-2">
          IF YOU DO NOT AGREE TO THESE TERMS AND CONDITIONS, DO NOT USE THE SITE OR SERVICES.
        </p>
        <p className="py-2">
          <small className="py-2">
            &copy; {new Date().getFullYear()} Bitmode, LLC. All rights reserved.
          </small>
        </p>
      </div>
    </Layout>
  );
};
