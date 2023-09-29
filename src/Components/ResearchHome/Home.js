import React, {Component, useContext} from "react";
import { Col, Container, Row } from "reactstrap";
import ResearchList from "./ResearchList.js";
import NewResearchModal from "./NewResearchModal.js";
import Menu from "../Fixed/Menu.js"
import "./home.css"
import ExperimentPreview from "./ExperimentPreview.js"
import ExperimentLandingPage from "../Experiment/ExperimentLandingPage.js"
import Search from "../Fixed/Search.js"
import {Link, Navigate} from 'react-router-dom';
import {AuthContext} from "../Login/Authenticator";
import ResearchesData from "./ResearchesData";
import {ResearchProvider} from "../Experiment/ResearchContext";

class Home extends Component {

    static contextType = AuthContext;

    componentDidMount() {
        this.props.resetState();
    }

    render() {
    return (
    <div className="column-wrapper">
		<div className="column column-1">
          <Menu researches={this.props.researches}/>
		</div>
		<div className="column column-2">
			<Container style={{ marginTop:35}}>
		    <Row>
              <h1 className="welcome">
                Welcome,
              <div className="name">Elana</div></h1>
            </Row>
            <Row>
                {this.props.researches.length === 0 ? (<h5>No researches here yet.</h5>):(this.props.researches.map((item) => (
                        <Col key={item.id}>
                            <Link to={`/data/${item.id}`} key={item.id} style={{ textDecoration: "none" }}>
                                <ExperimentPreview
                                    title={item.name}
                                    description={item.description}
                                />
                            </Link>
                        </Col>
                    )))}
      <Col>
        <div className="box3">
        <h6 className="add"><NewResearchModal create={true} resetState={this.props.resetState} /></h6>
        </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <ResearchesData researches={this.props.researches} resetState={this.props.resetState} />
      </Col>
            </Row>
           </Container>
		</div>
		<div className="column column-3">
			<Container style={{ marginTop: "20px" }}>
            <Row>
              <Col>
              </Col>
            </Row>
            <Row>
              <Col>
              </Col>
            </Row>
           </Container>
		</div>
      </div>
    );
  }
}

export default Home;
