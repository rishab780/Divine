import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import React from "react";

const Header = ({ user }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/Home">
          <FontAwesomeIcon icon={faUtensils} /> Divine
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {user &&
              <React.Fragment>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/Home">
                Home{" "}
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/Post">
                Review{" "}
              </Link>
            </li>
          </ul>
          </React.Fragment>
}
          <form className="form-inline">
            <ul className="navbar-nav mr-auto">
              {user &&
              <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/Logout">
                  Sign Out
                </Link>
              </li>
                <li className="nav-item">
                <Link className="nav-link" to="/Landing">
                 {user.name}
                </Link>
              </li>
              </React.Fragment>
              }{ !user && <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/Login">
                  Login{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Register">
                  Register{" "}
                </Link>
              </li>
              </React.Fragment>}
            </ul>
          </form>
          {/*
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  */}
        </div>
      </nav>
    </div>
  );
};

export default Header;
