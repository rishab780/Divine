import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  Redirect,
  
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./components/posts/Dashboard";
import Home from "./components/Home";
import Header from "./components/Header";
import "./App.css";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import PostForm from "./components/postForm";
import Landing from "./components/Landing";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/logout";
import { getCurrentUser } from "./services/authService";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();

    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        <main>
          <ToastContainer />
          <BrowserRouter>
            <div>
              <Header user={this.state.user} />
              <Route path="/Favourites" component={Home} />
              <Route path="/Landing" component={Landing} />
              <Route path="/Dashboard" component={Dashboard} />
              <Route path="/Home" component={Home} />
              <Route path="/Login" component={LoginForm} />
              <Route path="/Register" component={RegisterForm} />
              <Route path="/Post" component={PostForm} />
              <Route path="/UpdatePost/:id" component={PostForm} />
              <Route path="/Logout" component={Logout} />
              <Route exact path="/">
                <Redirect to="/Landing" />
              </Route>
            </div>
          </BrowserRouter>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
