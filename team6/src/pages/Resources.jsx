import React from "react";
import styled from "styled-components";
import bgPhoto from "../assets/san-jose.png";
import { ReactComponent as Logo } from "../crown.svg";

function Resources() {

  return (
    <HomeContainer >
      <InnerHomeContainer>
        <Header>Resources</Header>
        <Subheader>Interested in learning more?</Subheader>
        <a href="https://www.google.com">Google</a>
        <br />
        <p>Here's another:</p>
        <a href="https://www.google.com">Google</a>
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
  font-size: 20px;
  font-weight: bold;
  margin: auto;
  margin-bottom: 20px;
  color: black;
`

export default Resources;