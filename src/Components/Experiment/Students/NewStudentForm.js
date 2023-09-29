import React, {useEffect, useState} from 'react';
import HourSelector from "./HourSelector";
import ParticipantsAPIService from "../APIServices/ParticipantsAPIService";
import {render} from "@testing-library/react";
import newParticipantAPIService from "../APIServices/NewParticipantAPIService";
import newSchedulerAPIService from "../APIServices/NewSchedulerAPIService";
import axios from "axios";
import {API_URL} from "../../../Constants";
import cookie from "js-cookie";
import NewParticipantAPIService from "../APIServices/NewParticipantAPIService";
import newSchedulerAPI from "../APIServices/NewSchedulerAPI";

const NewStudentForm = ({research, context, isOpen, onClose, handleDelete}) => {
    const [gender, setGender] = useState('m');
    const [chosenContext, setChosenContext] = useState('');
    const [chosenHours, setChosenHours] = useState([]);
    const [participantCode, setParticipantCode] = useState(null);
    const [isFetching, setIsFetching] = useState(false);


    const handleNewParticipant = () => {
        setIsFetching(true);
        try {
            NewParticipantAPIService(research,chosenContext.id,gender, getParticipantCode);
        }
        catch (error) {
            console.error(
                'Error fetching questions:',
                error?.response?.data?.error ? error.response.data.error : error.message
            );
        }
    }

    const handleNewScheduler = (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
            const schedulerResponse = newSchedulerAPI(participantCode,chosenHours, research, chosenContext.id);
            console.log(schedulerResponse);
            setIsFetching(false);
            onClose();
        }
        catch (error) {
            console.error(
                'Error fetching questions:',
                error?.response?.data?.error ? error.response.data.error : error.message
            );
        }
    }

    const chooseContext = (context) => {
        setChosenContext(context);
        handleNewParticipant();
    }

    const getParticipantCode = (code) => {
        setParticipantCode(code);
    }

    const updateHours = (hours) => {
        setChosenHours(hours);
    }

    if (!isOpen) {
        return null;
    }

    const handleClose = () => {
        if (participantCode){
            handleDelete(participantCode);
        }
        onClose();
    };

    return (
        <form>
            <div>
                <button className="btn-close float-md-end" title="Cancel" onClick={handleClose}></button>
                <h3 className="header-stu">Add new participant</h3>
                <label className="header-stu" style={{marginTop:20}}>
                    1. Choose gender:
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                    </select>
                </label>
            </div>
            <div className="header-stu">2. Choose question tree:
                {chosenContext === '' ? (context.map((ctx) => (
                    <button className="transparent-button" onClick={(event)=>chooseContext(ctx)}>{ctx.name}</button>
                    ))) : (
                    <div className="header-stu" style={{margin:15}}> <i style={{marginRight:5}}>participant will receive questions from </i><b>{chosenContext.name}</b> </div>
                )}
            </div>
            <div className="header-stu">3. Choose notifications time:
                <HourSelector updateHours={updateHours}/>
            </div>
            <div>
                {chosenHours?.map((hour,index) => (
                    <li key={index} className="header-stu">{hour.toString().padStart(2, '0')}:00</li>
                ))}
            </div>
            {participantCode ? <button style={{marginTop:20}} className="transparent-button" onClick={handleNewScheduler}>Submit</button> : <p>Please wait for server</p>}
        </form>
    );
};

export default NewStudentForm;