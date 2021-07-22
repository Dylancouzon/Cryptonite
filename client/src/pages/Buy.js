import React from "react";
import CoinGraph from "../components/CoinGraph";
import BuyForm from "../components/BuyForm";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51IwEE1IfEtVhtvHpZQWzNy4cQE7zFhRUh78vuNtKysm9Mc5Zjs9dAH4FRRClE3a4MDw85OPJhJBcykpHbfyaP0Dm00MsH0JIB7");

function Buy() {


  return (
    <div style={{ overflow: "hidden"}}>
      <Elements stripe={stripePromise}>
        <CoinGraph />
        <BuyForm />
      </Elements>
    </div>
  )
}

export default Buy;