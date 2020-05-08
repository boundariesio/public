import React, { Component } from 'react';
import { GeoJSON } from 'react-leaflet';
import VectorMap from './vector-map';
import states from '../data/tour';

export default class Hero extends Component {
  state = {
    lat: 37.70017196507861,
    lng: -122.62021789550783,
    zoom: 10,
  };
  demo = () => {
    let wait = 0;
    setTimeout(() => {
      states.forEach((state, i) => {
        wait += state.duration;
        setTimeout(async () => {
          this.setState(state);
        }, wait * 1000);
      });
    }, 4000);
  };
  render() {
    return (
      <VectorMap
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
      >
        {this.state.feature && (
          <GeoJSON
            key={this.state.feature._id}
            style={{
              weight: 0.7,
              color: '#FF6300',
              fillColor: '#CC7a4d',
              fillOpacity: 0.2,
            }}
            data={this.state.feature}
          />
        )}
      </VectorMap>
    );
  }
}
