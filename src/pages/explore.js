import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout/public';
import Explorer from '../components/explorer';

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
