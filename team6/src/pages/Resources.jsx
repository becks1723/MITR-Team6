import React from "react";
import styled from "styled-components";
import bgPhoto from "../assets/san-jose.png";
function Resources() {

  return (
    <HomeContainer >
      <InnerHomeContainer>
        <Header>Resources</Header>
        <Subheader>Interested in learning more?</Subheader>
            <Subsubheader>Tax Credits and Incentives:</Subsubheader>
            <a href='https://www.irs.gov/credits-deductions/residential-clean-energy-credit'>IRS</a>
            <br/>
            <Subsubheader>Energy Communities:</Subsubheader>
            <a href='https://energycommunities.gov/energy-community-tax-credit-bonus/#:~:text=As%20defined%20in%20the%20Inflation,technologies%20located%20in%20energy%20communities.'>EnergyCommunities</a>
            <br/>
            <Subsubheader>Tribal Areas:</Subsubheader>
            <a href="https://news.bloombergtax.com/tax-insights-and-commentary/tribal-clean-energy-programs-will-benefit-from-new-tax-credits#:~:text=Key%20tax%20credits%20tribes%20can,serve%20tribal%20housing%20and%20residences.">Bloomberg</a>
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


const Subsubheader = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: auto;
  margin-top: 5px;
  color: black !important;
`

export default Resources;