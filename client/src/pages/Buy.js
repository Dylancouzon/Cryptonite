import React from "react";
import CoinGraph from "../components/CoinGraph";
import BuyForm from "../components/BuyForm";
import { Elements } from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
// const { REACT_APP_STRIPE_PUBLISHABLE_KEY, REACT_APP_STRIPE_TEST_PUBLISHABLE_KEY } = process.env; // This does not work right now something with the way i'm calling it

// const stripePromise = loadStripe(`"${REACT_APP_STRIPE_TEST_PUBLISHABLE_KEY}"`);
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