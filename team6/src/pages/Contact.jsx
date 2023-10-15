import React, { useState } from "react";
import styled from "styled-components";
import bgPhoto from "../assets/san-jose.png";
import { ReactComponent as Logo } from "../crown.svg";

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
            <div>
              <form onSubmit={handleSubmit}>
                  <label>
                      Name:
                      <input
                        placeholder="John Doe"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      />
                  </label>
                  <br />
                  <label>
                      Email:
                      <input
                        placeholder="example@gmail.com"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  </label>
                  <br /> <br />
                  <label>
                      Message: <br/>
                      <textarea
                          placeholder="What do you want to say?"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                      />
                  </label>
                  <br />
                  <button type="submit">Submit</button>
              </form>
            </div>
            <div>
              <h1>FAQ</h1>
              <p>Question 1: Answer 1</p>
              <p>Question 2: Answer 2</p>
              {/* Add more FAQs here */}
            </div>
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
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Contact;
