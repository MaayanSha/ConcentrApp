import React, {Component, useContext, useEffect, useState} from "react";
import { Col, Container, Row, Button } from "reactstrap";
import {useParams, Navigate, Routes, Route, Link, useNavigate} from "react-router-dom";
import "./Landing.css"
import "../ResearchHome/css/home.css"
import Menu from "../Fixed/Menu.js"
import Search from "../Fixed/Search.js"
import { AnswerRateData } from "./MockData.js"
import { dataAggregationModal} from "../Experiment/Aggregations/DataAggregationModal"
import AnswerRateChart from "./Visualizations/AnswerRateChart";
import {PieChartData} from "./MockData.js";
import {PieChart} from "./Visualizations/PieChart";
import DataAPIService from "./APIServices/DataAPIService";
import {mockCollectedData} from "./CollectedData/MockCollectedData";
import {currentResearchStore} from "./currentResearch";
import {observer} from "mobx-react-lite";


const ExperimentLandingPage = observer(() => {
	const research = currentResearchStore.currentResearch;
	const id = research.id;
	// Check if research is empty
	if (!research) {
		return null;
	}
	return (
		<div>
			<div className="column-wrapper">
				<div className="column column-1">
					<Menu />
				</div>
				<div className="column column-2" >
					<Row style={{marginTop:35}}>
						<h2>{research.name}</h2>
						<h4>Dashboard</h4>
					</Row>
					<Row>
					<div className="container" style={{height:350, display:"flex"}}>
						<AnswerRateChart data={dataAggregationModal.answerRateToday(mockCollectedData)}/>
						<PieChart pieData={dataAggregationModal.totalAnswersPerContext(mockCollectedData)}/>
					</div>
					</Row>
					<Row style={{ marginTop: "20px" }}>
						<Col>
							<Link
								to={`/data/${id}/edit`}>
								<button className="btn-exp">
									View / Edit Survey
								</button>
							</Link>
						</Col>
						<Col>
							<Link
								to={`/data/${id}/submissions`}>
							<button className="btn-exp">
								View Collected Data
							</button>
							</Link>
						</Col>
						<Col>
							<Link to={`/data/${id}/students`}>
								<button className="btn-exp">
									Manage Students
								</button>
							</Link>
						</Col>
					</Row>
				</div>
				<div className="column column-3">
				</div>
			</div>
		</div>
	);
})

export default ExperimentLandingPage;
