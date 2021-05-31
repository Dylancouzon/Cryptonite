import React from "react";
import { Link } from "react-router-dom";
import DeleteAccount from "../DeleteAccount";

function Sidebar() {


  return (
    <div style={{ padding: "0 100px"}}>
      <h3 className="sidebar-header">CryptoCoin</h3>
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/buy">Buy Coin</Link></li>
        <li><Link to="/send">Send Coin</Link></li>
        <li><Link to="/mining">Mine Coin</Link></li>
      </ul>
      <DeleteAccount />
    </div>
  )
}

export default Sidebar;