import CollectedData from "./CollectedData";
import {mockCollectedData} from "./MockCollectedData";
import "../../ResearchHome/css/home.css"
import SurveyMenu from "../Survey/SurveyMenu";
import React from "react";
import {currentResearchStore} from "../currentResearch";

export default function ViewCollectedData(){
    const research = currentResearchStore.currentResearch;
    return(
        <div className="column-wrapper">
            <div className="column-1">
                <SurveyMenu />
            </div>
            <div className="column-2" style={{flexGrow:0}}>
                <h2 className="header-stu" style={{marginTop:20}}>Collected Answer Submission Data</h2>
                <CollectedData data={mockCollectedData}/>
            </div>
            <div className="column-3">

            </div>
        </div>
    )
}