import React from "react";
import CoinGraph from "../components/CoinGraph";
import CryptoTicker from "../components/CryptoTicker";
import BuyForm from "../components/BuyForm";
import PayInfo from "../components/PayInfo";
import TransComplete from "../components/TransComplete";
import TransFailed from "../components/TransFailed";
import KeysModal from "../components/KeysModal";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

function Buy() {
  return (
    <>
      <CoinGraph />
      <CryptoTicker />
      <BuyForm />
      <Elements stripe={stripePromise}>
      <PayInfo />
      </Elements>
      <TransComplete />
      <TransFailed />
      <KeysModal />
    </>
  )
}

export default Buy;