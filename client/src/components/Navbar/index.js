import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Navbar, Button, Nav } from "react-bootstrap";
import Sidenav from "sidenavjs";
import Sidebar from "../Sidebar";
import SignUpForm from "../SignUp";
import LoginForm from "../Login";
import "./style.css";
import SessionContext from '../../utils/sessionContext';
import API from "../../utils/api";
import { privateKey } from '../../utils/googleOauth';

function Navigation() {
    const { logged_in } = useContext(SessionContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loginComponent, setLoginComponent] = useState("menu");

    const handleLogout = () => {
        API.logOut()
            .then(res => {
                console.log(res);
                document.location.replace('/');
            })
    }

    const onSetSidebarOpen = (open) => {
        setSidebarOpen(open)
    }
    setTimeout(() => {
        if (privateKey) {
            onSetSidebarOpen(true)
            setSidebarState("signUp")
        }
    }, 2000)
    const setSidebarState = (buttons) => {
        setLoginComponent(buttons)
    }
    if (logged_in) {
        return (
            <SessionContext.Consumer>
                {(state) => (
                    <>
                        <Sidenav
                            open={sidebarOpen}
                            onSetOpen={onSetSidebarOpen}
                            sidenav={
                                loginComponent === "menu" ? <Sidebar /> : loginComponent === "signUp" ? <SignUpForm /> : <LoginForm {...state} />
                            }
                        >
                            <Navbar className="container-fluid mb-2 navigation">
                                <Container>
                                    <Nav.Item>
                                        <Link className="navbar-brand" to="/">
                                            <img id="logo" src="./assets/cryptonite-logo-2.PNG" alt="brand-logo" />
                                        CryptoCoin
                                        </Link>
                                    </Nav.Item>
                                    <Nav className="ml-auto">
                                        <Nav.Item className="d-flex">
                                            <Button
                                                id="logout"
                                                variant="outline-light"
                                                type="button"
                                                onClick={handleLogout}>Logout
                                            </Button>
                                            <Button
                                                id="menu"
                                                className="btn hamburger"
                                                variant="outline-light"
                                                type="button"
                                                onClick={() => {
                                                    onSetSidebarOpen(true)
                                                    setSidebarState("menu")
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" className="bi bi-list hamburger" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                                </svg>
                                            </Button>
                                        </Nav.Item>
                                    </Nav>
                                </Container>
                            </Navbar>
                        </Sidenav>
                    </>
                )}
            </SessionContext.Consumer>
        )

    }
    return (
        <SessionContext.Consumer>
            {(state) => (
                <>
                    <Sidenav
                        open={sidebarOpen}
                        onSetOpen={onSetSidebarOpen}
                        sidenav={
                            loginComponent === "menu" ? <Sidebar /> : loginComponent === "signUp" ? <SignUpForm /> : <LoginForm {...state} />
                        }
                    >
                        <Navbar className="container-fluid mb-2 mb-2 navigation">
                            <Container>
                                <Nav.Item>
                                    <Link className="navbar-brand" to="/">
                                        <img id="logo" src="./assets/cryptonite-logo-2.PNG" alt="brand-logo" />
                                    CryptoCoin
                                    </Link>
                                </Nav.Item>
                                <Nav.Item className="d-flex">
                                    <Button
                                        id="signup"
                                        type="button"
                                        variant="outline-light"
                                        onClick={() => {
                                            onSetSidebarOpen(true)
                                            setSidebarState("signUp")
                                    }}>Sign-up
                                    </Button>
                                    <Button
                                        id="login"
                                        type="button"
                                        variant="outline-light"
                                        onClick={() => {
                                            onSetSidebarOpen(true)
                                            setSidebarState("login")
                                        }}>Login
                                </Button>
                                </Nav.Item>
                            </Container>
                        </Navbar>
                    </Sidenav>
                </>
            )}
        </SessionContext.Consumer>
    )
}

export default Navigation;