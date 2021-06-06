import React from "react";
import { Button } from "react-bootstrap";
import DeleteAccount from "../DeleteAccount";
import "./style.css";

function Sidebar() {

  return (
    <div>
      <h3 className="sidebar-header" style={{ marginTop: 20, marginBottom: 30, color: "whitesmoke" }}>Cryptonite</h3>

      <Button
        className="sidebutton"
        href="/profile"
        block

        variant="outline-light"
      >Profile
        </Button>
      <Button
        className="sidebutton"
        href="/buy"
        block
        variant="outline-light"
      >Buy Coin
        </Button>
      <Button
        className="sidebutton"
        href="/send"
        block
        variant="outline-light"
      >Send
        </Button>
      <Button
        className="sidebutton"
        href="/mining"
        block
        variant="outline-light"
      >Mine Coin
        </Button>
      <DeleteAccount block />
    </div>
  )
}

export default Sidebar;