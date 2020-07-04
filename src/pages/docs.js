import React from 'react';
import Layout from '../components/layout/Layout';

export default () => {
  return (
    <Layout>
      <div className="container mx-auto max-w-4xl">
        <div>
          <div>
            <h1 className="text-3xl font-semibold border-b my-4 pb-4" id="api-endpoints">
              The API
            </h1>
            <p className="font-light py-2">
              boundaries.io is an API for retrieving GeoJSON for common US geographic topologies.
              Data is mostly comprised of US Census TIGER data&emdash;yielding up-to-date
              information on the census-defined geographies converted from Shapefile format.
            </p>
            <p className="font-light py-2">
              You can query the boundaries.io API for free to retrieve GeoJSON documents with the
              same meta properties as the original shapefiles.
            </p>
            <p className="text-center">
              <img className="inline-block" src="http://i.imgur.com/zNSWIag.gif" alt="demo" />
            </p>
            <h1 className="text-3xl font-semibold border-b my-4 pb-4" id="api-endpoints">
              API Endpoints
            </h1>
            <p className="font-light py-2">Available geographies are as follows:</p>
            <p className="font-light py-2">
              <code className="bg-gray-200 px-1">states</code>,
              <code className="bg-gray-200 px-1">postal-codes</code>,
              <code className="bg-gray-200 px-1">places</code>,
              <code className="bg-gray-200 px-1">neighborhoods</code>,
              <code className="bg-gray-200 px-1">counties</code>
            </p>
            <p className="font-light py-2">
              These can be substituted anywhere a url references a path segment{' '}
              <code className="bg-gray-200 px-1">{'{geography}'}</code>
            </p>
            <h2 className="text-2xl font-semibold border-b my-4 pb-4" id="text-search">
              Text Search
            </h2>
            <p className="font-light py-2">
              <code className="bg-gray-200 px-1">
                geographies/{'{geography}'}?search={'{query}'}
              </code>
            </p>
            <p className="font-light py-2">
              Geographies can be searched via text to match against all attributes. This is helpful
              as the property names for certain geographies can be very specific in nature to the
              geography or datasource. For instance, a common 5-digit US postal code is contained in
              the property <code className="bg-gray-200 px-1">properties.ZCTA5CE10</code> in the{' '}
              <code className="bg-gray-200 px-1">postal-codes</code> geography. In order to not keep
              track of specific collection-based common names like{' '}
              <code className="bg-gray-200 px-1">ZCTA5CE10</code>, a search paramter is used on the{' '}
              <code className="bg-gray-200 px-1">geographies/{'{geography}'}</code> endpoint to
              search all text fields for a url query{' '}
              <code className="bg-gray-200 px-1">?search</code>.
            </p>
            <p className="font-light py-2">Example:</p>
            <pre className="bg-gray-200 p-2 overflow-x-scroll">
              <code>
                curl -H 'Accept: application/json'
                https://api.boundaries.io/geographies/postal-codes?search=33060
              </code>
            </pre>
            <h2 className="text-2xl font-semibold border-b my-4 pb-4" id="where-am-i-">
              Where Am I?
            </h2>
            <p className="font-light py-2">
              <code>
                geographies/{'{geography}'}/whereami?lat={'{latitude}'}&amp;lng={'{longitude}'}
              </code>
            </p>
            <p className="font-light py-2">
              When querying the <code>whereami</code> endpoint, the geography that contains the
              provided latitude/longitude pair will be returned if found. For instance, when
              requesting{' '}
              <code className="bg-gray-200 px-1">
                geographies/postal-codes/whereami?lat=36.011616617997426&amp;lng=-78.9103317260742
              </code>
              , the GeoJSON for postal-code 27701 will be returned as the lat/lng pair in the
              querystring is contained in the postal-code geography 27701. The corresponding{' '}
              <code className="bg-gray-200 px-1">states</code> geography would be north carolina.
            </p>
            <p className="font-light py-2">
              The corresponding mongodb geospatial query operator is{' '}
              <code className="bg-gray-200 px-1">$geoIntersects</code>.
            </p>
            <p className="font-light py-2">Example:</p>
            <pre className="bg-gray-200 p-2 overflow-x-scroll">
              <code className="bg-gray-200 px-1">
                curl -H 'Accept: application/json'
                https://api.boundaries.io/geographies/postal-codes/whereami?lat=36.011616617997426&amp;lng=-78.9103317260742
              </code>
            </pre>
            <h2 className="text-2xl font-semibold border-b my-4 pb-4" id="named">
              Named
            </h2>
            <p className="font-light py-2">
              <code>
                geographies/{'{geography}'}/named/{`{name}`}
              </code>
            </p>
            <p className="font-light py-2">
              The typical name key for geographies from the US Census TIGER shapefiles is{' '}
              <code className="bg-gray-200 px-1">properties.NAME</code>, but for postal-codes is
              <code className="bg-gray-200 px-1">properties.ZCTA5CE10</code>. Geographies can be
              queried against the identifying key with the <code>named</code> endpoint. By making a
              request to the <code className="bg-gray-200 px-1">named</code> endpoint, a geography
              collection can be queried by its common name property. For postal codes this is the
              5-digit common code. For states this is the state name.
            </p>
            <p className="font-light py-2">Example:</p>
            <pre className="bg-gray-200 p-2 overflow-x-scroll">
              <code>
                curl -H 'accept: application/json'
                https://api.boundaries.io/geographies/postal-codes/named/27705 curl -H 'accept:
                application/json'
                https://api.boundaries.io/geographies/states/named/north%20carolina
              </code>
            </pre>
            <h2 className="text-2xl font-semibold border-b my-4 pb-4" id="named-svg-image-">
              Named (SVG Image)
            </h2>
            <p className="font-light py-2">
              <code>
                geographies/{'{geography}'}/named/{'{name}'}.svg
              </code>
            </p>
            <p className="font-light py-2">Parameters:</p>
            <p className="font-light py-2">
              <code className="bg-gray-200 px-1">width</code>,{' '}
              <code className="bg-gray-200 px-1" code>
                height
              </code>
              , <code className="bg-gray-200 px-1">stroke</code>,{' '}
              <code className="bg-gray-200 px-1">fill</code>
            </p>
            <p className="font-light py-2">Example:</p>
            <pre className="bg-gray-200 p-2 overflow-x-scroll">
              <code>
                curl https://api.boundaries.io/geographies/states/named/north%20carolina.svg # =&gt;
                &lt;svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"&gt; # &lt;path
                d="M64.0623532378737,21.511595932804283
              </code>
            </pre>
            <h2 className="text-2xl font-semibold border-b my-4 pb-4" id="near-me">
              Near Me
            </h2>
            <p className="font-light py-2">
              <code className="bg-gray-200 px-1">
                geographies/{'{geography}'}/nearme?lat={'{latitude}'}&amp;lng={'{longitude}'}
              </code>
            </p>
            <p className="font-light py-2">
              Similar to the <code className="bg-gray-200 px-1">whereami</code> endpoint, one can
              query the nearby geographies with the <code className="bg-gray-200 px-1">nearme</code>{' '}
              endpoint. Simply provide a lat/lng
            </p>
            <p className="font-light py-2">
              The corresponding mongodb geospatial query operator is{' '}
              <code className="bg-gray-200 px-1">$near</code>.
            </p>
            <p className="font-light py-2">Example:</p>
            <pre className="bg-gray-200 p-2 overflow-x-scroll">
              <code>
                curl -H 'Accept: application/json'
                https://api.boundaries.io/geographies/postal-codes/nearme?lat=36.011616617997426&amp;lng=-78.9103317260742
              </code>
            </pre>
            <h2
              className="text-2xl font-semibold border-b my-4 pb-4"
              id="requesting-topojson-data-"
            >
              Requesting TopoJSON data:
            </h2>
            <p className="font-light py-2">
              The API may also be able to reduce large GeoJSON features by up to 80% in size using{' '}
              <code className="bg-gray-200 px-1">topojson</code>. To request topojson topologies
              instead of GeoJSON, simply use an{' '}
              <code className="bg-gray-200 px-1">Accept: application/topojson</code> header in your
              request to the API. If possible, the geography will be encoded into a topology. See{' '}
              <a href="https://github.com/mbostock/topojson/wiki/API-Reference#feature">
                <code className="bg-gray-200 px-1">topojson.feature</code>
              </a>{' '}
              for info on transforming this back to GeoJSON on the client side.
            </p>
            <h3 id="where-did-the-data-come-from-">Where did the data come from?</h3>
            <p className="font-light py-2">
              Counties, States, Zips, and Places data were collected from
              <a href="https://www.census.gov/geo/maps-data/data/tiger-line.html">
                The US Census Bureau Tiger/Line® Shapefiles
              </a>
            </p>
            <p className="font-light py-2">
              Neighborhood data was sourced from
              <a href="http://www.zillow.com/howto/api/neighborhood-boundaries.htm">
                Zillow's Neighborhood Boundaries
              </a>{' '}
              shapefile data and the <a href="http://durhamhoods.com/">Durham Hoods</a> project.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
