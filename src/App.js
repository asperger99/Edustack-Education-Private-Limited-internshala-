import React,{useState} from "react";
import "./App.css";
import LandingPage from "./LandingPage";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import {Page1} from "./Page1"
import { UseStateValue } from "./StateProvider";
import Page2 from "./Page2"
import Page3 from "./Page3"

function App() {
  const [{ user }, dispatch] = UseStateValue();

  return (
    <div className="app">
   
      <Router>
        <Switch>
          <Route exact path="/" component= {!user?LandingPage:Page1} />
          {/* <Route exact path="/" component= {Page1} /> */}
          <Route exact path="/page2" component= {Page2} />
          <Route exact path="/page3" component= {Page3} />
       
        </Switch>
      </Router> 

    </div>
  );
}

export default App;
