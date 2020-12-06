import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

import "./Landing.css";

class Landing extends Component {
 
  render() {
    return (
      <div className="text-center" id="mainBox">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <main role="main" className="inner cover">
            <h1 className="cover-heading"><FontAwesomeIcon icon={faUtensils} /> Divine</h1>
            <p className="lead">
               
            “DIVINE – Never have a bad meal”<br/>
Your ONE stop place to find best food items.<br/>
A website made to review food items from various places like restaurant, clubs, café and many more such places.
            </p>
            <p className="lead">
              <a href="/Login" className="btn btn-lg btn-secondary">
                Login
              </a>
            </p>
          </main>

    
        </div>
      </div>
    );
  }
}

export default Landing;
