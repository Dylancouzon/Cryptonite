import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <h3 className="sidebar-header">CryptoCoin</h3>
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/buy">Buy Coin</Link></li>
        <li><Link to="/send">Send Coin</Link></li>
        <li><Link to="/mining">Mine Coin</Link></li>
      </ul>
    </>
  )
}

export default Sidebar;