import React from 'react';
import Layout from '../components/layout/public';
import Explorer from '../components/explorer';
import { Helmet } from 'react-helmet';

export default () => {
  return (
    <Layout>
      <Helmet>
        <title>Bitmode Boundaries | Explore the data</title>
      </Helmet>
      <Explorer />
    </Layout>
  );
};
