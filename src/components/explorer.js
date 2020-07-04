import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Map, GeoJSON, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'leaflet/dist/leaflet.css';
import MapBoxGLLayer from './mapbox-gl-layer';
import Client from '../services/client';
import Alert from './alert';

const client = new Client();

export default class Explore extends Component {
  componentDidMount() {
    const apiKey = localStorage.getItem('apiKey');
    if (apiKey) {
      this.setState({ apiKey });
      client.setAPIKey(apiKey);
    }
  }

  state = {
    apiKey: '',
    collection: 'places',
    lat: 35.70017196507861,
    lng: -78.62021789550783,
    features: {},
    misses: [],
    alerts: [],
    zoom: 10
  };

  miss(latlng) {
    this.alert({
      message: `A feature could not be found for ${latlng.lat}, ${latlng.lng}`
    });
    this.setState(({ misses }) => {
      return {
        misses: [...misses, latlng]
      };
    });
  }

  alert(descriptor) {
    const alert = { id: Date.now(), ...descriptor };
    const remove = () => {
      this.setState(({ alerts }) => {
        return {
          alerts: alerts.filter(candidate => candidate.id != alert.id)
        };
      });
    };
    alert.remove = remove;
    this.setState(({ alerts }) => {
      return { alerts: [...alerts, alert] };
    });
    setTimeout(remove, 5000);
  }

  render() {
    const { zoom, lat, lng, features, apiKey, alerts, misses } = this.state;
    if (typeof window === 'undefined') return null;
    return (
      <>
        <nav>
          <div className="container flex items-center justify-between mx-auto py-2">
            <div>
              <label className="font-semibold" for="collection-select">
                Collection:{' '}
              </label>
              <select
                id="collection-select"
                onChange={e => {
                  this.setState({ collection: e.target.value });
                }}
                name="collection"
              >
                <option value="places">US Places (cities, towns, etc)</option>
                <option value="postal-codes">US Zip Code Tabulated Areas</option>
                <option value="counties">US Counties</option>
                <option value="states">US States</option>
              </select>
            </div>
            <div>
              {/* <div className="relative mx-auto ">
                <input
                  className="border-2 border-gray-300 bg-white h-10 px-2 pr-16 rounded-lg text-sm focus:outline-none"
                  type="search"
                  name="search"
                  placeholder="Search"
                />
                <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                  <svg
                    className="text-gray-600 h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    xlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 56.966 56.966"
                  >
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </div> */}
            </div>
            <div className="w-5/12">
              <label for="api-key" className="inline-block font-semibold pr-2">
                API Key:{' '}
              </label>
              <input
                id="api-key"
                className="appearance-none w-9/12 border rounded py-1 px-2 text-gray-600 focus:outline-none"
                type="text"
                value={apiKey}
                onChange={e => {
                  this.setState({ apiKey: e.target.value });
                  client.setAPIKey(e.target.value);
                  localStorage.setItem('apiKey', e.target.value);
                }}
              />
            </div>
          </div>
        </nav>
        <section className="z-10 relative" style={{ height: '70vh' }}>
          <Map
            zoom={zoom || 9}
            vector={false}
            onClick={e => {
              const { lat, lng } = e.latlng;
              const { collection } = this.state;
              client
                .collection(collection)
                .whereami([lat, lng])
                .then(({ data }) => {
                  this.setState(({ features }) => {
                    const newFeatures = {
                      ...features
                    };
                    data.collection = collection;
                    newFeatures[data._id] = data;
                    return { features: newFeatures };
                  });
                })
                .catch(error => {
                  if (error.request?.status === 404) {
                    this.miss({ ...e.latlng, collection });
                  } else {
                    this.alert({
                      message: e.message,
                      color: 'red'
                    });
                  }
                });
            }}
            className="w-full h-full"
            style={{
              cursor: 'crosshair'
            }}
            center={[lat, lng]}
          >
            <MapBoxGLLayer
              url="https://d2munx5tg0hw47.cloudfront.net/tiles/{z}/{x}/{y}.mapbox"
              accessToken="pk.eyJ1IjoiamJpZWxpY2siLCJhIjoiY2lodjhrN3JnMDF6anRza2hpc2tsNTZ3OSJ9.G5EWvgZXPGysnczXfAdHuw"
              style="mapbox://styles/jbielick/ck9qh9uzh14z81jqma0el9rii"
            />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            />
            {misses
              .filter(({ collection }) => {
                console.log(collection, this.state.collection);
                return collection === this.state.collection;
              })
              .map(({ lat, lng }) => (
                <Marker
                  icon={L.divIcon({
                    html: `
          <svg
            className="fill-current opacity-25 cursor-crosshair h-6 w-6 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Miss</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>`,
                    className: 'miss'
                  })}
                  position={[lat, lng]}
                  bubblingMouseEvents={false}
                />
              ))}
            {Object.values(features)
              .filter(({ collection }) => collection === this.state.collection)
              .map(feature => (
                <>
                  <GeoJSON
                    key={feature._id}
                    style={{
                      weight: 0.3,
                      color: '#FF6300',
                      fillColor: '#CC7a4d',
                      fillOpacity: 0.2
                    }}
                    bubblingMouseEvents={false}
                    onClick={_error => {
                      this.setState(({ features }) => {
                        const newFeatures = { ...features };
                        delete newFeatures[feature._id];
                        return { features: newFeatures };
                      });
                    }}
                    data={feature}
                  >
                    <Tooltip direction="top" offset={L.point(0, -10)} sticky>
                      {feature.properties.NAME || feature.properties.GEOID10}
                    </Tooltip>
                  </GeoJSON>
                  {/* {feature.properties?.INTPTLAT && (
                  <Marker
                    position={[
                      feature.properties.INTPTLAT.replace('+', ''),
                      feature.properties.INTPTLON.replace('+', '')
                    ]}
                  ></Marker>
                )} */}
                </>
              ))}
          </Map>
          <div className="absolute right-0 bottom-0 px-4 py-6" style={{ zIndex: '900' }}>
            <TransitionGroup>
              {alerts.map(alert => (
                <CSSTransition key={alert.id} timeout={300} classNames="fade">
                  <Alert color={alert.color} remove={alert.remove}>
                    <div>{alert.message}</div>
                  </Alert>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </section>
      </>
    );
  }
}
