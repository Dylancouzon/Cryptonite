import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Sidenav from "sidenavjs";
import Sidebar from "../Sidebar";

function Navigation() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const onSetSidebarOpen = (open) => {
        setSidebarOpen(open)
    }

    return (
        <>
            <Navbar>
                <Link className="navbar-brand" to="/">
                    <img src="./assets/logo-25.svg" alt="brand-logo" />
                    CryptoCoin
                </Link>
                <button onClick={() => { onSetSidebarOpen(true) }} type="button" id="sidebarToggle" class="btn btn-info">
                    <img src="./assets/bars-solid.svg" alt="menu"></img>
                </button>
            </Navbar>
            <Sidenav
                open={sidebarOpen}
                onSetOpen= {onSetSidebarOpen}
                sidenav={
                    <Sidebar />
                }
            >
            </Sidenav>
        </>
    )
}

export default Navigation;