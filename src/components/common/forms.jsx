import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import SelectMenu from "./selectMenu";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const options = {
      abortEarly: false,
    };

    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const result = Joi.validate(obj, schema);
    if (!result.error) return null;
    return result.error.details[0].message;
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
   
    this.setState({ data, errors });
  };
  renderSubmitForm(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderCancelForm = (label, redirectTo) => (
    <button
      onClick={() => this.handleCancel(redirectTo)}
      className="btn btn-secondary ml-2"
    >
      {label}
    </button>
  );
  renderInput(name, label, type = "text", autoFocus = false) {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        autoFocus={autoFocus}
      />
    );
  }
  renderSelectMenu = (name, label, options, autoFocus = false) => {
    const { data, errors } = this.state;

    return (
      <SelectMenu
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
        autoFocus={autoFocus}
      />
    );
  };
}

export default Form;
