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
import Footer from "./components/Footer";
import API from "./utils/api";
import "./app.css";


class App extends Component {
  constructor(props) {
    super(props);

    this.setSession = ({ username, publicKey, logged_in }) => {
      // console.log(username, publicKey, logged_in);
      this.setState(state => ({
        username: username,
        publicKey: publicKey,
        logged_in: logged_in
      }))
    }

    this.state = {
      setSession: this.setSession,
    };
  }

  componentDidMount() {
    if (!this.state.logged_in) {
      API.getSessions()
        .then((res) => {
          console.log(res);
          if (res.data.logged_in) {
            this.setSession(res.data);
          }
        });
    }
  }

  render() {
    return (
      <SessionContext.Provider value={this.state}>
        <Router>
          <Navigation />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/buy" component={Buy} />
              <Route exact path="/send" component={Send} />
              <Route exact path="/mining" component={Mining} />
            </Switch>
          </Container>
          <Footer />
        </Router>
      </SessionContext.Provider>
    );
  }
}

export default App;
