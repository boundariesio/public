import React from 'react';
import { RedocStandalone } from 'redoc';
import { Helmet } from 'react-helmet';

import spec from '../data/openapi.yaml';
import Layout from '../components/layout/public';

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Boundaries by bitmode | API Documentation</title>
      </Helmet>
      <RedocStandalone
        spec={spec}
        options={{
          nativeScrollbars: true,
          theme: { colors: { primary: { main: '#3c4a50' } } }
        }}
      />
    </Layout>
  );
};
