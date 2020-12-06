import React, { Component } from "react";
import Joi from "joi-browser";
import {login} from "../services/authService"

import Form from "./common/forms";
class LoginForm extends Form {
  state = {
    data: {  username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async() => {
    try {
        await login(this.state.data.username,this.state.data.password);       
        console.log("imhere") 
        window.location = '/home'
        
    } catch (error) {
       
    }
      
  };

  render() {
    return (
      <div className="container " >
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

        <form onSubmit={this.handleSubmit}>
        {this.renderInput("username", "Username", true)}
          {this.renderInput("password", "Password", "password")}

          {this.renderSubmitForm("Submit")}
          
        </form>
      </div>
    );
  }
}

export default LoginForm;
