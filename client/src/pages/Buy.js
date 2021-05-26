import React from "react";
import CoinGraph from "../components/CoinGraph";
import CryptoTicker from "../components/CryptoTicker";
import BuyForm from "../components/BuyForm";
import TransComplete from "../components/TransComplete";
import TransFailed from "../components/TransFailed";
import KeysModal from "../components/KeysModal";

function Buy() {
  return (
    <>
      <CoinGraph />
      <CryptoTicker />
      <BuyForm />
      <TransComplete />
      <TransFailed />
      <KeysModal />
    </>
  )
}

export default Buy;