import React from "react";
import CoinGraph from "../components/CoinGraph";
import CryptoTicker from "../components/CryptoTicker";
import BuyForm from "../components/BuyForm";

function Buy() {
  return (
    <>
      <CoinGraph />
      <CryptoTicker />
      <BuyForm />
    </>
  )
}

export default Buy;