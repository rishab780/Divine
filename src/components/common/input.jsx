import React, { Component } from "react";

const Input = ({ name, label, error,  onChange, ...rest }) => {
  
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}       
        id={name}
        name={name}
        {...rest}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
