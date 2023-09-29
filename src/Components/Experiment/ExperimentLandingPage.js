import React, {Component, useContext, useEffect} from "react";
import { Col, Container, Row, Button } from "reactstrap";
import { useParams, Navigate, Routes, Route, Link } from "react-router-dom";
import "./Landing.css"
import "../ResearchHome/home.css"
import Menu from "../Fixed/Menu.js"
import Search from "../Fixed/Search.js"
import { AnswerRateData } from "./MockData.js"
import AnswerRateChart from "./Visualizations/AnswerRateChart";
import {PieChartData} from "./MockData.js";
import {PieChart} from "./Visualizations/PieChart";


function ExperimentLandingPage(props) {
	const { id } = useParams();

	if (!props.researches || props.researches.length === 0) {
		return null;
	}
	// Find the research with matching pk
	const research = props.researches.find((item) => item.id == id);

	// Check if research is empty
	if (!research) {
		return null;
	}
	localStorage.setItem('research', JSON.stringify(research));

	return (
		<div>
			<div className="column-wrapper">
				<div className="column column-1">
					<Menu researches = {props.researches}/>
				</div>
				<div className="column column-2" >
					<Row style={{marginTop:35}}>
						<h2>{research.name}</h2>
						<h4>Dashboard</h4>
					</Row>
					<Row>
					<div style={{height:350, display:"flex"}}>
						<AnswerRateChart data={AnswerRateData}/>
						<PieChart pieData={PieChartData}/>
					</div>
					</Row>
					<Row style={{ marginTop: "20px" }}>
						<Col>
							<Link
								to={`/data/${id}/edit`} state={{ research:research,}}>
								<button className="btn-exp">
									View / Edit Survey
								</button>
							</Link>
						</Col>
						<Col>
							<Link
								to={`/data/${id}/submissions`} state={{ research:research,}}>
							<button className="btn-exp">
								View Collected Data
							</button>
							</Link>
						</Col>
						<Col>
							<Link to={`/data/${id}/students`} state={{ research:research,}}>
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
}

export default ExperimentLandingPage;
