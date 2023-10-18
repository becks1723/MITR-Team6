import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styled from 'styled-components';
mapboxgl.accessToken = 'pk.eyJ1IjoiYmVraTE3MjMiLCJhIjoiY2xubmN0aHR0MDN3dDJscDFjb3dwcnJ2biJ9.7yw3B1pSgWFIC425BveDOQ';

// Create styled components
const Topbar = styled.div`
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
`;

const Sidebar = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px;
`

const Incentive1 = styled.section`
  height: 26%;
  border: 2px solid red;
  border-radius: 15px;
  margin: 10px;
  background-color: #fc00002f;
`

const Incentive2 = styled.section`
  height: 26%;
  border: 2px solid blue;
  border-radius: 15px;
  margin: 10px;
  background-color: #3700fc2e;
`

const Incentive3 = styled.section`
  height: 26%;
  border: 2px solid green;
  border-radius: 15px;
  margin: 10px;
  background-color: #00fc082e;
`

const IncentiveHeader = styled.h1`
  font-weight: bolder;
  font-size: large;
`

const IncentiveText = styled.p`
  
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const MapContainer = styled.div`
  min-height: 500px;
  width: 75%;
  padding: 20px;
  border-radius: 15px;
`;

const AppContainer = styled.div`
  min-height: calc( 100vh - 150px );
`;

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <AppContainer>
      <Topbar>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </Topbar>
      <Row>
        <Sidebar>
          <Incentive1>
            <IncentiveHeader>
              Incentive 1
            </IncentiveHeader>
            <IncentiveText>
              Blah blah blah
            </IncentiveText>
          </Incentive1>
          <Incentive2>
            <IncentiveHeader>
              Incentive 2
            </IncentiveHeader>
            <IncentiveText>
              Beep beep boop
            </IncentiveText>
          </Incentive2>
          <Incentive3>
            <IncentiveHeader>
              Incentive 3
            </IncentiveHeader>
            <IncentiveText>
              Hello, hi, hello.
            </IncentiveText>
          </Incentive3>
        </Sidebar>
        <MapContainer ref={mapContainer} />
      </Row>
    </AppContainer>
  );
}
