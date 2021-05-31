import React, { useState} from 'react';
import { Link } from "react-router-dom";
import { Navbar, Button, Nav } from "react-bootstrap";
import Sidenav from "sidenavjs";
import Sidebar from "../Sidebar";
import SignUpForm from "../SignUp";
import LoginForm from "../Login";
import "./style.css";
import SessionContext from '../../utils/sessionContext';


function Navigation() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loginComponent, setLoginComponent] = useState("menu")

    const onSetSidebarOpen = (open) => {
        setSidebarOpen(open)
    }

    const setSidebarState = (buttons) => {
        setLoginComponent(buttons)
    }

    return (
        <SessionContext.Consumer>
            {(state) => (
                <>
                    <Navbar className="container-fluid">
                        <Nav.Item>
                            <Link className="navbar-brand" to="/">
                                <img src="./assets/logo-25.svg" alt="brand-logo" />
                            CryptoCoin
                            </Link>
                        </Nav.Item>
                        <Nav.Item className="d-flex">
                            <Button
                                id="signup"
                                type="button"
                                onClick={() => {
                                    onSetSidebarOpen(true)
                                    setSidebarState("signUp")
                                }}>Sign-up
                            </Button>
                            <Button
                                id="login"
                                type="button"
                                onClick={() => {
                                    onSetSidebarOpen(true)
                                    setSidebarState("login")
                                }}>Login
                            </Button>
                            <Button
                                id="menu"
                                className="btn btn-info"
                                type="button"
                                onClick={() => {
                                    onSetSidebarOpen(true)
                                    setSidebarState("menu")
                                }}>
                                <i className="fas fa-bars"></i>
                            </Button>
                        </Nav.Item>
                    </Navbar>
                    <Sidenav
                        open={sidebarOpen}
                        onSetOpen={onSetSidebarOpen}
                        options={{ width: 1000 }}
                        sidenav={
                            loginComponent === "menu" ? <Sidebar /> : loginComponent === "signUp" ? <SignUpForm /> : <LoginForm {...state} />
                        }
                    />
                </>
            )}
        </SessionContext.Consumer>
    )
}

export default Navigation;