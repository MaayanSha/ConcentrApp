import React, {useContext, useState} from 'react';
import StudentsList from "./StudentsList";
import {useLocation} from "react-router-dom";
import SurveyMenu from "../Survey/SurveyMenu";
import {ResearchContext} from "../ResearchContext";
import {currentResearchStore} from "../currentResearch";

export default function ManageStudents(){
    const storedResearch = currentResearchStore.currentResearch;

    return(
        <div className="column-wrapper">
            <div className="column-1">
                <SurveyMenu />
            </div>
        <div className="column-2">
           <StudentsList research={storedResearch}/>
        </div>
            <div className="column-3">
            </div>
        </div>
    );
}