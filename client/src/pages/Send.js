import React from "react";
import SendForm from "../components/SendForm";
import WalletCoinsUser from "../components/WalletCoinsSend";
import Footer from "../components/Footer";

function Send() {
  return (
    <>
        <WalletCoinsUser />
        <SendForm />
        <Footer />
    </>
  )
}

export default Send;