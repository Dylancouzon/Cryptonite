import React, { useContext } from "react";
import WalletCoins from "../components/WalletCoins";
// import TransHist from "../components/TransHist";
import SessionContext from "../utils/sessionContext";
// import API from "../utils/api";


function Profile() {

  const { username, publicKey, logged_in } = useContext(SessionContext);
  console.log(username, publicKey, logged_in);


  // useEffect(() => {
    
  // })


  // getUserTransactions = (publicKey) => {
  //   API.getAddressTransactions(publicKey)
  //   .then(res => {

  //   })
  // }
  return (
    <>
      <WalletCoins  />
      {/* <TransHist 
      value={this.state.transactions}
      /> */}
    </>
  )
}

export default Profile;