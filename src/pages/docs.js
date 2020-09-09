import React from 'react';
import { RedocStandalone } from 'redoc';
import Layout from '../components/layout/Layout';
import spec from '../data/openapi.yaml';

export default () => {
  return (
    <Layout>
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
