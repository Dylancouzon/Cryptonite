import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Buy from "./pages/Buy";
import Send from "./pages/Send";
import Mining from "./pages/Mining";
import { Container } from "react-bootstrap";
// import SessionContext from "./utils/sessionContext";



class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: "",
  //     publicKey: ""
  //   };

  //   this.setSession = ({userSes, publicSes}) => {
  //     this.setState(state => ({
  //       username: userSes,
  //       publicKey: publicSes
  //     }))
  //   }
  // }

  render() {
    return (
      <Container>
        <Router>
          <Navigation />
          <Switch>
            {/* <SessionContext.Provider value={this.state}> */}
              <Route exact path="/" component={Home} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/buy" component={Buy} />
              <Route exact path="/send" component={Send} />
              <Route exact path="/mining" component={Mining} />
            {/* </SessionContext.Provider> */}
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
