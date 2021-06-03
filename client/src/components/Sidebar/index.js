import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import DeleteAccount from "../DeleteAccount";
import "./style.css";

function Sidebar() {


  return (
    <div>
      <h3 className="sidebar-header" style={{ marginTop: 20, marginBottom: 30, color: "whitesmoke" }}>CryptoCoin</h3>

      <Button
        className="sidebutton"
        href="/profile"
        block
        variant="dark"
        variant="outline-light"
      >Profile
        </Button>
      <Button
        className="sidebutton"
        href="/buy"
        block
        variant="dark"
        variant="outline-light"
      >Buy Coin
        </Button>
      <Button
        className="sidebutton"
        href="/send"
        block
        variant="dark"
        variant="outline-light"
      >Send
        </Button>
      <Button
        className="sidebutton"
        href="/mining"
        block
        variant="dark"
        variant="outline-light"
      >Mine Coin
        </Button>
      <DeleteAccount block />
    </div>
  )
}

export default Sidebar;