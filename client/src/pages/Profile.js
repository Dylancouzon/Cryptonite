import React from "react";
import WalletCoins from "../components/WalletCoins";
import TransHist from "../components/TransHist";
import BuySendBtn from "../components/BuySendBtn";



function Profile() {
  return (
    <>
      <WalletCoins />
      <TransHist />
      <BuySendBtn />
    </>
  )
}

export default Profile;