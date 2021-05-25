import React from "react";
import Navigation from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import KeysModal from './components/KeysModal'

function App() {
  return (
    <>
      <Navigation />
      <Home />
      <KeysModal />
    </>
  );
}

export default App;
