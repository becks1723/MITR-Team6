import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styled from 'styled-components';
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Tooltip,
  Select
} from '@chakra-ui/react'
mapboxgl.accessToken = 'pk.eyJ1IjoiYmVraTE3MjMiLCJhIjoiY2xubmN0aHR0MDN3dDJscDFjb3dwcnJ2biJ9.7yw3B1pSgWFIC425BveDOQ';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const mapStyle = ['mapbox://styles/mapbox/streets-v12', 'mapbox://styles/mapbox/light-v11', 'mapbox://styles/mapbox/dark-v11', 'mapbox://styles/mapbox/satellite-streets-v12', 'mapbox://styles/mapbox/navigation-day-v1', 'mapbox://styles/mapbox/navigation-night-v1']
  const options = [{ label: 'Streets', value: 0 }, { label: 'Light', value: 1 }, { label: 'Dark', value: 2 }, { label: 'Satellite', value: 3 }, { label: 'Navigation Day', value: 4 }, { label: 'Navigation Night', value: 5 }];
  const [selectedOption, setSelectedOption] = useState(0);
  const [lng, setLng] = useState(-121.9);
  const [lat, setLat] = useState(37.35);
  const [zoom, setZoom] = useState(12);
  const [address, setAddress] = React.useState('');
  const [mini, setMini] = React.useState({ "_id": 0, "features": [{ "type": "Feature", "properties": { "fid": 1, "ZCTA5CE20": "0" } }] });
  const [count, setCount] = useState(0);
  const [inc1, setShow1] = useState(true);
  const [inc2, setShow2] = useState(true);
  const [inc3, setShow3] = useState(true);
  let inc1Color = '#e0e0e0'
  let inc2Color = '#808080'
  let inc3Color = '#e0e0e0'


  // ['#EF476F70', '#EF476F'];
  // ['#26547C70', '#26547C'];
  // ['#FFD16670', '#FFD166'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Address: ${address}`);
    try {
      let result = await fetch('http://localhost:3001/zipcode/' + address, { method: 'GET', mode: 'cors' });
      if (!result.ok) {
        throw new Error(`Failed with status ${result.status}`);
      }
      let data = await result.json();
      setMini(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  React.useEffect(() => {
    if (map.current) {
      console.log(mini); // This will log the updated value of mini when it changes
      addLayer(); // Perform other actions after mini state update
      //changeIncentives();
    }
  }, [mini]);

  // Becky - don't delete dis function plez
  // async function changeIncentives() {
  //   let allIncentives = await fetch('put URL here');
  //   if(!allIncentives.ok) {
  //     throw new Error('You failed');
  //   }

  //   setShow1(true);
  //   setShow2(true);
  //   setShow3(true);

  //   let test = {
  //     "index": 0,
  //     "name": "B",
  //     "state": "",
  //     "zipcodes": [],
  //     "description": ""
  //   }

  //   if (test.name == 'A') {
  //     setShow1(false);
  //   }
  // }



  async function checkInc1() {
    try {
      let result = await fetch('http://localhost:3001/incentives/' + address, { method: 'GET', mode: 'cors' });
      if (!result.ok) {
        throw new Error(`Failed with status ${result.status}`);
      }
      let data = await result.json();
      if (data[0].data.length != 0) {
        inc1Color = '#EF476F70'
      }
      if (data[1].data.length != 0) {
        inc2Color = '#26547C70'
      }
      if (data[2].data.length != 0) {
        inc3Color = '#FFD16670'
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  function addLayer() {
    if (!map.current || !map.current.isStyleLoaded()) {
      return; // Map or map style not loaded yet
    }

    console.log("zipcode:", mini.features[0].properties.ZCTA5CE20);

    var c = mini._id + "" + count;
    setCount(count + 1);
    var idStr = mini._id === 0 ? "0" : c;
    var sourceStr = mini.features[0].properties.ZCTA5CE20 === "0" ? "0" : c;

    map.current.addSource(sourceStr, {
      type: "geojson",
      data: mini
    });

    map.current.addLayer(
      {
        id: idStr,
        type: "fill",
        source: sourceStr,
        paint: {
          "fill-color": "#808080",
          "fill-opacity": 0.6
        }
      },
    );
    map.current.flyTo({
      center: [mini.features[0].properties.INTPTLON20, mini.features[0].properties.INTPTLAT20],
      zoom: 12
    });
    console.log(mini);
  }

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle[selectedOption],
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
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Search>
              <FormLabel> <Subheader>Enter Zip Code</Subheader></FormLabel>
              <Inputdiv>
                <Input placeholder="12180"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)} />
              </Inputdiv>
              <Button colorScheme='purple' type='submit'>
                Submit
              </Button>
            </Search>
          </FormControl>
        </form>
      </Topbar>
      <Row>
        <Sidebar>
          <button onClick={checkInc1}>CHECK 1</button>
          <div>
            <SelectSection>
              <IncentiveText>Map Type</IncentiveText>
              <Select color={"black"} bg={"white"} onChange={(e) => setSelectedOption(e.target.value)}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </SelectSection>
          </div>
          <LongLat>
            Longitude: {lng}  <br /> Latitude: {lat} <br /> Zoom: {zoom}
          </LongLat>
          <IncentiveText>Hover the boxes below for more information</IncentiveText>

          {inc1 && <Incentive1 id='I1' style={{ 'border': '2px solid #EF476F', 'border-radius': '12px', 'margin': '10px', 'background-color': { inc1Color }, 'padding-top': '30px', 'padding-bottom': '30px' }}>
            <Tooltip
              label="Solar tax credits are primarily governed by the federal government and are designed to incentivize the adoption of solar energy systems. The two main federal solar tax credits are the Investment Tax Credit (ITC) and the Residential Renewable Energy Tax Credit. These credits offer over 30% back on the cost of a solar project."
            >
              <IncentiveHeader>
                State Tax Credit
              </IncentiveHeader>
            </Tooltip>
          </Incentive1>}

          {inc2 && <Incentive2 id='I2' style={{ 'border': '2px solid #26547C', 'border-radius': '12px', 'margin': '10px', 'background-color': { inc2Color }, 'padding-top': '30px', 'padding-bottom': '30px' }}>
            <Tooltip
              label="This incentive provides a bonus of up to 10% for production tax credits and 10 percentage points for investment tax credits for projects in energy communities."
            >
              <IncentiveHeader>
                Energy Communities
              </IncentiveHeader>
            </Tooltip>
          </Incentive2>}

          {inc3 && <Incentive3 id='I3' style={{ 'border': '2px solid #FFD166', 'border-radius': '12px', 'margin': '10px', 'background-color': { inc3Color }, 'padding-top': '30px', 'padding-bottom': '30px' }}>
            <Tooltip label="Tribes can access tax credits of 30–70% for renewable energy projects. There is also a bonus tax credit for projects on American Indian lands or that serve tribal housing and residences.">
              <IncentiveHeader>
                Tribal Areas
              </IncentiveHeader>
            </Tooltip>
          </Incentive3>}
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

`

const Incentive2 = styled.section`

`

const Incentive3 = styled.section`

`

const IncentiveHeader = styled.h1`
  font-weight: bolder;
  font-size: large;
`

const IncentiveText = styled.p`
  margin-top: 10px;
  font-size: small;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
`

const MapCanvas = styled.div`
  min-height: calc( 100vh - 160px );
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

const SelectSection = styled.div`
  margin: 0 10px 10px 10px;
  background-color: #791E9430;
  padding: 10px;
  border-radius: 12px;

`