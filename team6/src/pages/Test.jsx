import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  RadioGroup,
  Radio, 
  Stack
} from '@chakra-ui/react'

function Test() {

  const [value, setValue] = React.useState('Zip Code');
  var placeholderInp = value === 'Zip Code' ? 'Enter a 5-digit zip code' : 'Enter a county';
  const [address, setAddress] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Address: ${address}`);
    var ZorC = value === 'Zip Code' ? true : false;
  };


  return (
    <AppContainer>
      <Topbar>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Search>
              <RadioGroup onChange={setValue} value={value}>
                <Stack direction='column'>
                  <Radio value='Zip Code' defaultChecked>Zip Code</Radio>
                  <Radio value='County'>County</Radio>
                </Stack>
              </RadioGroup>
              <FormLabel> <Subheader>Enter {value}</Subheader></FormLabel>
              <Inputdiv>
                <Input  placeholder= {placeholderInp}
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}/>
              </Inputdiv>
              <Button colorScheme='purple' type='submit'>
                Submit
              </Button>
            </Search>
          </FormControl>
        </form>
      </Topbar>
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

export default Test;