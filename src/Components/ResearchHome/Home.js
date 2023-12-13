import React, {useContext, useEffect} from "react";
import { Col, Container, Row } from "reactstrap";
import NewResearchModal from "./NewResearchModal.js";
import Menu from "../Fixed/Menu.js"
import "./css/home.css"
import ExperimentPreview from "./ExperimentPreview.js"
import {Link} from 'react-router-dom';
import ResearchesData from "./ResearchesData";
import {observer} from "mobx-react-lite";
import { research } from "../Research";
import { currentResearchStore } from "../Experiment/currentResearch";
import {render} from "@testing-library/react";
import {toJS} from "mobx";
import {AuthContext} from "../Login/Authenticator";

const Home = observer(() => {
    const { user } = useContext(AuthContext);
     return (
            <div className="column-wrapper">
                <div className="column column-1">
                    <Menu researches={research.allResearches}/>
                </div>
                <div className="column column-2">
                    <Container style={{marginTop: 35}}>
                        <Row>
                            <h1 className="welcome">
                                Welcome,
                                <div className="name">{user}</div></h1>
                        </Row>
                        <Row>
                            {research.allResearches.length === 0 ? (
                                <h5>No researches here yet.</h5>) : (research.allResearches.map((item) => (
                                <Col key={item.id}>
                                    <Link to={`/data/${item.id}`} key={item.id} style={{textDecoration: "none"}} onClick={()=>chooseResearchHandler(item.id)}>
                                        <ExperimentPreview
                                            title={item.name}
                                            description={item.description}
                                        />
                                    </Link>
                                </Col>
                            )))}
                            <Col>
                                <div className="box3">
                                    <h6 className="add"><NewResearchModal create={true}
                                                                          /></h6>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ResearchesData researches={research.allResearches}/>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="column column-3">
                    <Container style={{marginTop: "20px"}}>
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
})
export default Home;

export const chooseResearchHandler = (id) => {
        currentResearchStore.setCurrentResearch(id);
}