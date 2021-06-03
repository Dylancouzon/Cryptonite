import React from "react";
import { Accordion } from "react-bootstrap";
import About from "../About";
import LearnMore from "../LearnMore";
import GetStarted from "../GetStarted";

function Accords() {

  
  return (

    <>
      <Accordion defaultActiveKey="0">
        <About/>
        <LearnMore/>
        <GetStarted/>
      </Accordion>
    </>

  )
}

export default Accords;