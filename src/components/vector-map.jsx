import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapBoxGLLayer from './mapbox-gl-layer';

const position = [51.505, -0.09];
const VectorMap = (props) => (
  <>
    <Map
      center={position}
      zoom={9}
      {...props}
      style={{ width: '100%', height: '100%', ...props.style }}
    >
      {/* <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      /> */}
      <MapBoxGLLayer
        url="https://d2munx5tg0hw47.cloudfront.net/tiles/{z}/{x}/{y}.mapbox"
        accessToken={
          'pk.eyJ1IjoiamJpZWxpY2siLCJhIjoiY2lodjhrN3JnMDF6anRza2hpc2tsNTZ3OSJ9.G5EWvgZXPGysnczXfAdHuw'
        }
        style="mapbox://styles/jbielick/ck9qh9uzh14z81jqma0el9rii"
      />
      {props.children}
    </Map>
  </>
);

export default VectorMap;
