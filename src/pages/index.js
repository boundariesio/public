import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Layout from '../components/layout/public';
import Button from '../components/Button';
import CustomerCard from '../components/CustomerCard';
import LabelText from '../components/LabelText';
import Hero from '../components/hero';
import SplitSection from '../components/SplitSection';
import Pricing from '../components/pricing';
import Support from '../svg/support';
import customerData from '../data/customer-data';
import GeoClient from '../svg/geo-client';
import Brackets from '../svg/brackets';
import Clipboard from '../svg/clipboard';
import Data from '../svg/data';
import Fast from '../svg/fast';

export default () => {
  return (
    <Layout home>
      <section className="py-10 md:py-20 relative">
        <div className="z-0 absolute bottom-0 right-0 top-0 left-0">
          <Hero />
        </div>
        <div className="z-10 relative container py-2 md:py-2 mx-auto px-8 lg:flex">
          <div className="text-left w-100 md:w-3/4 lg:w-1/2">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-none">
              We make geospatial boundary data easy
            </h1>
            <p className="text-xl lg:text-2xl mt-6 font-light">
              You query, we deliver. Get accurate GeoJSON features for administrative, municipal,
              and social geographic boundaries.
            </p>
            <p className="text-center md:text-left mt-8 md:mt-12">
              <AnchorLink className="px-4" offset={40} href="#pricing">
                <Button size="xl" className="font-bold bg-secondary hover:bg-secondary">
                  Get an API key
                </Button>
              </AnchorLink>
            </p>
            <p className="text-center md:text-left mt-4 text-gray-600">
              Try it before you buy it. No credit card required.
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="pt-10 lg:pt-20">
        <div className="container px-12 md:px-24 mx-auto">
          <div className="flex flex-col sm:flex-row sm:-mx-3 mt-8">
            <div className="flex-1 py-4 px-3">
              <h2 className="text-2xl">
                <small className="align-middle inline-block">
                  <Brackets height="1.8em" />
                </small>
                <br />
                Built for developers
              </h2>
              <p className="text-gray-700 mt-4">
                You know that feeling when an API is intuitive? That's what we're going for. Rest
                assured that attention to detail and developer experience is an integral part of
                this offering.
              </p>
            </div>
            <div className="flex-1 py-4 px-3">
              <h2 className="text-2xl">
                <small className="align-middle inline-block">
                  <Data height="1.8em" />
                </small>
                <br />
                Flexible Querying
              </h2>
              <p className="text-gray-700 mt-4">
                We keep it simple so you can avoid getting in the weeds of geospatial queries. For
                most requests, you can just pass a latitude and longitude.
              </p>
            </div>
            <div className="flex-1 py-4 px-3">
              <h2 className="text-2xl">
                <small className="align-middle inline-block">
                  <Clipboard height="1.8em" />
                </small>
                <br />
                Quality Data
              </h2>
              <p className="text-gray-700 mt-4">
                US Counties, States, Zips, and Places are sourced from{' '}
                <a href="https://www.census.gov/geo/maps-data/data/tiger-line.html">
                  US Census Bureau Shapefiles
                </a>
                . Neighborhood data is sourced from{' '}
                <a href="http://www.zillow.com/howto/api/neighborhood-boundaries.htm">
                  Zillow's Neighborhood Data
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-12 md:pb-20"></section>
      <SplitSection
        primarySlot={
          <div className="lg:pr-32 xl:pr-48">
            <h3 className="text-3xl font-semibold leading-tight">We speak GeoJSON.</h3>
            <p className="mt-8 text-xl font-light leading-relaxed">
              Let us handle the shapefiles and ogres. All data is returned in GeoJSON (
              <code>CRS:84</code>), so it's ready to use in nearly any mapping tool, database, or
              visualization. We can even return TopoJSON if you need smaller data payloads.
            </p>
          </div>
        }
        secondarySlot={<GeoClient />}
      />
      <SplitSection
        reverseOrder
        primarySlot={
          <div className="lg:pl-32 xl:pl-48">
            <h3 className="text-3xl font-semibold leading-tight">We're fast.</h3>
            <p className="mt-8 text-xl font-light leading-relaxed">
              Response time to first byte is as low as 100ms so you can work quickly. We like speed
              and don't like compromising to get it.
            </p>
          </div>
        }
        secondarySlot={<Fast />}
      />
      <SplitSection
        id="support"
        primarySlot={
          <div className="lg:pr-32 xl:pr-48">
            <h3 className="text-3xl font-semibold leading-tight">We're here for support</h3>
            <p className="mt-8 text-xl font-light leading-relaxed">
              Get help when you need it on a paid plan. Whether it's API help, client-side mapping,
              or visualizations—we can help. You'll speak directly with developers.
            </p>
          </div>
        }
        secondarySlot={<Support />}
      />
      <section id="testimonials" className="py-12 md:py-20 lg:py-40">
        <div className="container mx-auto">
          <LabelText className="mb-8 text-gray-600 text-center">What users are saying</LabelText>
          <div className="flex flex-col md:flex-row md:-mx-3">
            {customerData.map(customer => (
              <div key={customer.customerName} className="flex-1 px-3">
                <CustomerCard customer={customer} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="container max-w-full mx-auto pt-12 px-6">
        <Pricing />
      </section>
    </Layout>
  );
};
