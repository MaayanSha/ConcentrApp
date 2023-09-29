import React, {useContext, useState} from 'react';
import StudentsList from "./StudentsList";
import {useLocation} from "react-router-dom";
import SurveyMenu from "../Survey/SurveyMenu";
import {ResearchContext} from "../ResearchContext";

export default function ManageStudents(props){
    // const location = useLocation()
    // const { research } = location.state;
    const storedResearch = JSON.parse(localStorage.getItem('research'));

    return(
        <div className="column-wrapper">
            <div className="column-1">
                <SurveyMenu research={storedResearch}/>
            </div>
        <div className="column-2">
           <StudentsList research={storedResearch}/>
        </div>
            <div className="column-3">
            </div>
        </div>
    );
}