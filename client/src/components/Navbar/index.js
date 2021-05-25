import React from 'react';
import { Navbar } from "react-bootstrap";
import Sidebar from "../Sidebar";

function Navigation() {
    return (
        <>
            <Navbar>
                <Navbar.Brand href="#home">
                    <img src="./assets/logo-25.svg" alt="brand-logo" />
                    CryptoCoin
                </Navbar.Brand>
                <button type="button" id="sidebarCollapse" class="btn btn-info">
                    <img src="./assets/bars-solid.svg" alt="menu"></img>
                </button>
            </Navbar>
            <Sidebar />
        </>
    )
}

export default Navigation;