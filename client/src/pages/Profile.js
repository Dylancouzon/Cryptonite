import React from "react";
import WalletCoins from "../components/WalletCoins";
import TransHist from "../components/TransHist";
import session from "express-session";


function Profile() {
   // state = {
  // balance: 0,
  // transactions: []
  // }
  console.log(session);

  // componentDidMount = () => {
  //   this.getUserBalance()
  // }


  // getUserBalance = (publicKey) => {
  //   API.getAddressBalance(publicKey)
  //   .then(res => {
  //     this.setState({
  //       ...state,
  //       balance: res.data,
  //     })
  //   })
  //   getUserTransactions();
  // }

  // getUserTransactions = (publicKey) => {
  //   API.getAddressTransactions(publicKey)
  //   .then(res => {
  //     this.setState({
  //       ...state,
  //       transactions: res.data
  //     })
  //   })
  // }
  // return (
  //   <>
  //     <WalletCoins />

  //     <TransHist 
  //     value={this.state.transactions}
  //     />
  //   </>
  // )
  return (
    <>
      <WalletCoins />
      <TransHist />
    </>
  )
}

export default Profile;