import React, { Component } from "react";
import Dashboard from "./posts/Dashboard";

class Home extends Component {
  state = {};
  render() {
    console.log(this.props);
    return (
      <div>
    
        <div className="container" style={{marginTop:'20px'}}> 
          <Dashboard {...this.props}/>
        </div>
      </div>
    );
  }
}

export default Home;
