import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import React, { Component, Fragment } from "react";
import axios from "axios";

import { API_URL } from "../../Constants/index.js";
import cookie from "js-cookie";

class NewResearchForm extends Component {
  state = {
    name: "",
    description: ""
  }; //defining properties of each research

  componentDidMount() {
    if (this.props.research) {
      const { name, description} = this.props.research;
      this.setState({ name, description});
    }
  }//recover the state info from the parent component

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }; //update the state field when changes

  createResearch = e => {
    e.preventDefault();
    axios.post(API_URL + "experiments/", this.state, {
      headers: {
        'Authorization': `Bearer ${cookie.get('jwt-authorization')}`
      }
    }).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };//triggering POST when submitting

  editResearch = e => {
    e.preventDefault();
    const id = this.props.research.id;
    axios.patch(API_URL + `experiments/${id}/`, this.state, {
      headers: {
        'Authorization': `Bearer ${cookie.get('jwt-authorization')}`
      }
    }).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };//triggering PUT when editing

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

//react form
  render() {
    return (
    //if this props already exists, go to edit. o.w, go to create
      <Form onSubmit={this.props.research ? this.editResearch : this.createResearch}>
        <FormGroup>
          <Label for="name">Research Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Research Description:</Label>
          <Input
            type="text"
            name="description"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.description)}
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default NewResearchForm;