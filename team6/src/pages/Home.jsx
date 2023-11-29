import React from "react";
import styled from "styled-components";
import bgPhoto from "../assets/san-jose.png";
import { ReactComponent as Logo } from "../crown.svg";

function Home() {
  const postTest = () => {
    fetch('http://localhost:3001/import-json', {
      "method": "POST",
      // "Access-Control-Allow-Origin": "*"
    });
  }

  const getTest = () => {
    var queryString = 'http://localhost:3001/95932/' + ['T', 'C']; //+ JSON.stringify(['T']);
    fetch(queryString, {
      "method": "GET"
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }

  return (
    <HomeContainer >
      <InnerHomeContainer>
        <Logo/>
        <button onClick={postTest}>post</button>
        <button onClick={getTest}>get Tribal</button>
        <Header>Welcome to ZAMP</Header>
        <Subheader>Mission Statement...</Subheader>
        <p>blah blah blah</p>
      </InnerHomeContainer>
    </HomeContainer>
  );
}

// Styled components for styling
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc( 100vh - 150px );
  background-image: url(${bgPhoto});
  text-align: center;
  padding: 30px;
`

const InnerHomeContainer = styled.div`
  width: 50%;
  background-color: white;
  padding: 30px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Header = styled.h1`
  font-size: 50px;
  font-weight: bolder;
  color: black;
`

const Subheader = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin: auto;
  margin-bottom: 20px;
  color: black;
`

export default Home;