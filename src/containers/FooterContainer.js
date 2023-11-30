import React from "react";
import styled from "styled-components";

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 5vh;
  background-color: #0f3621;
  color: #ffffff;
  padding: 0.5rem 0;
  a{
    color: #ffffff;
  }
  a:hover{
    color: orange;
  }
`;

const FooterContainer = () => {
  return (
    <Footer>
      <span>Developed by <a href="https://www.linkedin.com/in/shubham-dasarwar-1a1683143/" target="_blank" rel="noreferrer">Shubham Dasarwar</a></span>
    </Footer>
  );
};

export default FooterContainer;
