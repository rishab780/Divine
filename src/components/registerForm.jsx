import React from "react";
import Joi from "joi-browser";
import Form from "./common/forms";
import * as userService from "../services/usersService"
import { loginWithJwt } from "../services/authService";


class RegisterForm extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(8).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  doSubmit = async () => {
    try{
      const data1 = await userService.register(this.state.data);      
      loginWithJwt(data1.headers['x-auth-token']);
      window.location = '/home'
     
    }catch(ex){
   
      if(ex.response && ex.response.status === 400){
       
         const errors = {...this.state.errors};
         errors.username = ex.response.data;
         this.setState({errors});
      }
    }
    
  };

  render() {
    return (
      <div className="container">
        <form className="form-register" onSubmit={this.handleSubmit}>
          <h1 className="h3 text-left">Register</h1>
          {this.renderInput("username", "Username", true)}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}

          {this.renderSubmitForm("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
