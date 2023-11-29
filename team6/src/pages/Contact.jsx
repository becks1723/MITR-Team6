import React, { useState } from "react";
import styled from "styled-components";
import bgPhoto from "../assets/san-jose.png";
import { ReactComponent as Logo } from "../crown.svg";
import {
  FormControl,
  FormLabel,
  Button,
  Input
} from '@chakra-ui/react'

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
        //add backend stuff here
    };

    return (
      <HomeContainer>
        <InnerHomeContainer>
          <Logo />
            <Header>Contact Us</Header>
          <ContentWrapper>
            <form  onSubmit={handleSubmit} >
              <FormControl>
              <FormLabel>Name</FormLabel>
              <Input  placeholder="John Doe"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}/>
              <br /> <br />
              <FormLabel>Email address</FormLabel>
              <Input  placeholder="example@gmail.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}/>
              <br /> <br />
              <FormLabel>Message</FormLabel>
              <Input  type='text' 
                      placeholder="What do you want to say?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}/>
              <Button
              mt={4}
              colorScheme='purple'
              type='submit'
              >
                Submit
              </Button>
              </FormControl>
            </form>
          
          <FAQSection>
            <Subheader>FAQ</Subheader>
            <SubsubHeader>Where can I find more information about these government incentives?</SubsubHeader>
              <p>Check out our <b>Resources</b> page.</p>
            <SubsubHeader>When was the map last updated?</SubsubHeader>
              <p>The data about government incentives shown in the map was last updated in October 2023.</p>
          </FAQSection>
          </ContentWrapper>
        </InnerHomeContainer>
      </HomeContainer>
    );
}

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
  width: 70%;
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
  font-size: 25px;
  font-weight: bold;
  margin: 15px auto 30px auto;
  margin-bottom: 20px;
  color: black;
`

const SubsubHeader = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin-top: 10px;
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FAQSection = styled.section`
  margin: 0px 20px 0px 20px;
  background-color: #791E9440;
  border-radius: 12px;
`

export default Contact;
