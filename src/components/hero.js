import React, { Component } from 'react';
import { Map, GeoJSON } from 'react-leaflet';
import states from '../data/tour';
import 'leaflet/dist/leaflet.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapBoxGLLayer from './mapbox-gl-layer';

const INITIAL_DELAY = 1400;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default class Hero extends Component {
  state = {
    lat: 37.70017196507861,
    lng: -122.62021789550783,
    zoom: 11
  };
  demo = async () => {
    await sleep(INITIAL_DELAY);
    let i = 0;
    while (i < 1000) {
      const state = states[i % states.length];
      this.setState(state);
      await sleep(state.duration * 1000);
      i += 1;
    }
  };
  render() {
    if (typeof window == 'undefined') return null;
    return (
      <Map
        animate
        duration={this.state.duration}
        whenReady={this.demo}
        zoom={this.state.zoom || 9}
        dragging={false}
        zoomControl={false}
        keyboard={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        touchZoom={false}
        easeLinearity={0.5}
        center={[this.state.lat, this.state.lng]}
        className="w-full h-full"
      >
        <MapBoxGLLayer
          url="https://d2munx5tg0hw47.cloudfront.net/tiles/{z}/{x}/{y}.mapbox"
          accessToken="pk.eyJ1IjoiamJpZWxpY2siLCJhIjoiY2lodjhrN3JnMDF6anRza2hpc2tsNTZ3OSJ9.G5EWvgZXPGysnczXfAdHuw"
          style="mapbox://styles/jbielick/ck9qh9uzh14z81jqma0el9rii"
        />
        {this.state.feature && (
          <GeoJSON
            key={this.state.feature._id}
            style={{
              weight: 0.7,
              color: '#FF6300',
              fillColor: '#CC7a4d',
              fillOpacity: 0.2
            }}
            data={this.state.feature}
          />
        )}
      </Map>
    );
  }
}
