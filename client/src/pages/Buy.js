import React from "react";
import BuyForm from "../components/BuyForm";
import TransComplete from "../components/TransComplete";
import TransFailed from "../components/TransFailed";


function Buy() {
  return (
    <>
      <BuyForm />
      <TransComplete />
      <TransFailed />
    </>
  )
}

export default Buy;