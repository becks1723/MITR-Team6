import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styled from 'styled-components';
import {
  FormControl,
  FormLabel,
  Button,
  Input
} from '@chakra-ui/react'
import mini from '../assets/mini-zip.geojson';
mapboxgl.accessToken = 'pk.eyJ1IjoiYmVraTE3MjMiLCJhIjoiY2xubmN0aHR0MDN3dDJscDFjb3dwcnJ2biJ9.7yw3B1pSgWFIC425BveDOQ';


export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-121.9);
  const [lat, setLat] = useState(37.35);
  const [zoom, setZoom] = useState(12);

  function addLayer() {
    map.current.addSource("zipcode", {
      type: "geojson",
      data: mini
    });

    map.current.addLayer(
      {
        id: "zipcode",
        type: "fill",
        source: "zipcode",
        paint: {
          "fill-color": "#CCCCCC",
          "fill-opacity": 0.5
        }
      },
    );

      console.log(mini);
  }
  
  useEffect(() => {
    if (map.current) return; 
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      // The map style is now loaded, so it's safe to add the layer
      addLayer();
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
          <FormControl>
            <Search>
              <FormLabel> <Subheader>Enter Address</Subheader></FormLabel>
              <Inputdiv>
                <Input  placeholder="San Jose, 95101"
                        type="text"/>
              </Inputdiv>
              <Button colorScheme='purple' type='submit'>
              Submit
              </Button>
            </Search>
          </FormControl>
      </Topbar>
      <Row>
        <Sidebar>
          <LongLat>
            Longitude: {lng}  <br/> Latitude: {lat} <br/> Zoom: {zoom}
          </LongLat>
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
        <MapCanvas ref={mapContainer} />
      </Row>
    </AppContainer>
  );
}

// Create styled components
const Topbar = styled.div`
  border-top: solid #791E94 1px;
  padding: 10px;
  text-align: center;
  width: 100%;
  justify-content: center;
`

const Search = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Inputdiv = styled.div`
  width: 70%;
`

const Sidebar = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 10px;
  height: 90%;
  justify-content: space-between;
`

const LongLat = styled.div`
  background-color: #791E94;
  color: #fff;
  padding: 10px;
  text-align: center;
  border-radius: 12px;
  font-size: small;
`;

const Incentive1 = styled.section`
  border: 2px solid #EF476F;
  border-radius: 12px;
  margin: 10px;
  background-color: #EF476F70;
`

const Incentive2 = styled.section`
  border: 2px solid #26547C;
  border-radius: 12px;
  margin: 10px;
  background-color: #26547C70;
`

const Incentive3 = styled.section`
  border: 2px solid #FFD166;
  border-radius: 12px;
  margin: 10px;
  background-color: #FFD16670;
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
  align-items: center;
  justify-items: center;
`

const MapCanvas = styled.div`
  min-height: 500px;
  width: 100%;
  padding: 10px 10px 0 0;
`

const AppContainer = styled.div`
  min-height: calc( 100vh - 150px );
  padding:  0 0 20px 0;
  border-bottom: solid #791E94 1px;
`

const Subheader = styled.h2`
  font-size: 18px;
  font-weight: bolder;
  color: black;
`
