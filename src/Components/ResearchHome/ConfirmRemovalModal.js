import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import "./newResearch.css"

import axios from "axios";

import { API_URL } from "../../Constants";
import cookie from "js-cookie";

class ConfirmRemovalModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  deleteStudent = id => {
    axios.delete(API_URL + `experiments/${id}/`, {
      headers: {
        'Authorization': `Bearer ${cookie.get('jwt-authorization')}`
      }
    }).then((res) => {
      this.props.resetState();
      this.toggle();
    });
  };

  render() {
    return (
      <Fragment>
        <button className="transparent-button" onClick={() => this.toggle()}>
          Remove
        </button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Are you sure you want to delete the experiment and all of its data?
          </ModalHeader>

          <ModalFooter>
            <button className="btn-edit" type="button" onClick={() => this.toggle()}>
              Cancel
            </button>
            <button
            className="btn-edit"
              type="submit"
              onClick={() => this.deleteStudent(this.props.id)}
            >
              Yes
            </button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ConfirmRemovalModal;