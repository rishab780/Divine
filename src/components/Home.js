import React, { Component } from "react";
import Dashboard from "./posts/Dashboard";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
    
        <div className="container" style={{marginTop:'20px'}}> 
          <Dashboard />
        </div>
      </div>
    );
  }
}

export default Home;
