import React, { Component } from "react";
import { Table } from "reactstrap";
import NewResearchModal from "./NewResearchModal";

import ConfirmRemovalModal from "./ConfirmRemovalModal";
import "./list.css"

class ResearchList extends Component {
  render() {
    const researches = this.props.researches;
    return (
      <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th>Options</th>
              <th></th>
          </tr>
        </thead>
        <tbody>
          {!researches || researches.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Oops, nothing here yet</b>
              </td>
            </tr>
          ) : (
            researches.map(research => (
              <tr key={research.id}>
                <td>{research.name}</td>
                  <td>{research.description}</td>
                  <td>{research.created_at.slice(0,10)}</td>
                  <td>{research.updated_at.slice(0,10)}</td>
                <td align="center">
                  <NewResearchModal
                    create={false}
                    research={research}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    id={research.id}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
}

export default ResearchList;