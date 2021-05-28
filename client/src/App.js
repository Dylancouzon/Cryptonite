import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Buy from "./pages/Buy";
import Send from "./pages/Send";
import Mining from "./pages/Mining";
import { Container } from "react-bootstrap";
import SessionContext from "./utils/sessionContext";



class App extends Component {
  constructor(props) {
    super(props);



    this.setSession = ({username, publicKey, logged_in}) => {
      console.log(username, publicKey);
      this.setState(state => ({
        username: username,
        publicKey: publicKey,
        logged_in: logged_in
      }))
    }

    this.state = {
      username: "",
      publicKey: "",
      logged_in: false,
      setSession: this.setSession,
    };
    console.log(this.state);
  }

  render() {
    return (
      <Container>
        <Router>
        <SessionContext.Provider value={this.state}>
          <Navigation />
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/buy" component={Buy} />
              <Route exact path="/send" component={Send} />
              <Route exact path="/mining" component={Mining} />
          </Switch>
          </SessionContext.Provider>
        </Router>
      </Container>
    );
  }
}

export default App;
