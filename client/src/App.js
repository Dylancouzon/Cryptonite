import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Buy from "./pages/Buy";
import Send from "./pages/Send";
import Mining from "./pages/Mining";
import { Container } from "react-bootstrap";



function App() {
  return (
    <Container>
      <Router>

        <Navigation />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/buy" component={Buy} />
          <Route exact path="/send" component={Send} />
          <Route exact path="/mining" component={Mining} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
