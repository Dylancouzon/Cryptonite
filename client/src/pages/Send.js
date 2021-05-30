import React from "react";
import SendForm from "../components/SendForm";
import WalletCoinsUser from "../components/WalletCoinsSend";

function Send() {
  return (
    <>
        <WalletCoinsUser />
        <SendForm />
    </>
  )
}

export default Send;