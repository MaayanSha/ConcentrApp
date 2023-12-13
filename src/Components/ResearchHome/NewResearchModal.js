import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import NewResearchForm from "./NewResearchForm";
import "./newResearch.css"
import {research} from "../Research";

class NewResearchModal extends Component {
  state = {
    modal: false
  }; //default state is off

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };//each toggle switches the state on\off

  resetState = () => {
    research.getResearches();
  }
  render() {
    const create = this.props.create;

    var title = "Editing Existing Research";
    var button = <button className="transparent-button" role="button" onClick={this.toggle}>Edit</button>;
    if (create) {
      title = "Creating New Research";

      button = (
        <button
          className="new-btn" onClick={this.toggle}>
          <h1>+</h1>
          Add New
        </button>

      );
    }

    return (
      <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewResearchForm
              resetState={this.resetState}
              toggle={this.toggle}
              research={create? null : this.props.research}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewResearchModal;