import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader, Modal, ModalBody} from "reactstrap";
import "./students.css"
import {MdDelete, MdFileDownloadDone} from "react-icons/md";
import ProgressBar from 'react-customizable-progressbar'
import {SlUserFollow} from "react-icons/sl";
import NewStudentForm from "./NewStudentForm";
import ParticipantsAPIService from "../APIServices/ParticipantsAPIService";
import {ParticipantEditAPIService} from "../APIServices/ParticipantEditAPIService";
import {dataAggregationModal} from "../Aggregations/DataAggregationModal";
import {mockCollectedData} from "../CollectedData/MockCollectedData";
import {currentResearchStore} from "../currentResearch";

const imageFemale='https://www.w3schools.com/howto/img_avatar2.png';
const imageMale='https://www.w3schools.com/howto/img_avatar.png';
const StudentsList = () => {

    const research = currentResearchStore.currentResearch;
    const [isEditHour, setIsEditHour] = useState(-1);
    const [hourIndex, setHourIndex] = useState('');
    const [hour, setHour] = useState('');
    const [newHour, setNewHour] = useState('');
    const [isHover, setIsHover] = useState(false);
    const [personStats, setPersonStats] = useState(-1);
    const [isNewStudent, setIsNewStudent] = useState(false);
    const [isUpdate,setIsUpdate] = useState(false);
    const [codesList, setCodesList] = useState([]);
    const [pingTimes, setPingTimes] = useState([]);
    const [contextData, setContextData] = useState([]);
    const [answerStats, setAnswerStats] = useState([]);


    const handleHourEdit = (hourId, personId) => {
        setIsEditHour(personId);
        setHourIndex(hourId);
    }
    const handleHourChange = (value) => {
        setNewHour(value);
    };
    const handleHourSubmit = (code, hour) => {
        if (newHour === ''){
            setIsEditHour(-1);
        }
        else{
            ParticipantEditAPIService.editHour(code,hour,newHour);
            setIsEditHour(-1);
        }
    }

    const handleStudentDelete = (personId) => {
        ParticipantEditAPIService.deleteParticipant(personId);
    }

    const setHover = (id) => {
        if (isHover){
            setIsHover(false);
            setPersonStats(-1);
        }
        else{
            setIsHover(true);
            setPersonStats(id);
        }
    }

    const toggleNew = () => {
        setIsNewStudent(!isNewStudent);
    }

    const handleDataFetch = (codeData, schedulerData, contextData) => {
        setCodesList(codeData);
        setContextData(contextData);
        let hourArray = [];
        const jointArray = [];
        schedulerData.map(participant => {
            const participantCode = participant[0].participant_code;
            for (let i = 0; i < participant.length; i++) {
                hourArray.push(participant[i].ping_times);
            }
            jointArray.push({ participantCode, hourArray: [...hourArray] });
            hourArray = [];
        });
        setPingTimes(jointArray);
        const stats = dataAggregationModal.answerRatePerUser(mockCollectedData, codeData);
        setAnswerStats(stats)
    };

    const fetchPingTimes = (code) => {
        const targetParticipant = pingTimes.find(participant => participant.participantCode === code);
        if (targetParticipant) {
            return targetParticipant.hourArray;
        }
        // Return a default array if participant is not found
        return ["10:00","14:00","18:00"];
    };


    useEffect(()=>{
        ParticipantsAPIService({research, handleDataFetch}).then();
    },[isUpdate])

    const updateData = () => {
    setTimeout(() => {
        setIsUpdate(!isUpdate);
    }, 1000)
}

    return (
            <div className="col-md-8">
                <h2 className="header-stu" style={{marginTop:20}}>Manage Participants</h2>
                <h6  className="icons" onClick={toggleNew} type="button" style={{fontSize:20, marginTop:20, fontFamily:"karla"}}> <SlUserFollow /> add new participant</h6>
                <Modal isOpen={isNewStudent} onClosed={updateData}>
                    <ModalBody>
                        <NewStudentForm research={research} context={contextData} isOpen={isNewStudent} onClose={toggleNew} handleDelete={handleStudentDelete}/>
                    </ModalBody>
                </Modal>
                <div className="row">
                    {codesList.map((person, personIndex) => (
                        <div className="col-md-4" key={personIndex}>
                            <Card>
                                <CardBody>
                                    <div onClick={()=>setHover(personIndex)}>
                                    {personStats !== personIndex ?
                                        <div className="crop">
                                            <img alt="avatar"
                                                 className="avatar" src={person.gender === "m" ? imageMale : imageFemale}/>
                                        </div>
                                        :
                                        <ProgressBar
                                            progress={(answerStats.find((student)=>student.code === person.code).count)*12}
                                            radius={70}
                                            strokeWidth={18}
                                            strokeColor="#5d9cec"
                                            strokeLinecap="square"
                                            trackStrokeWidth={18}>
                                            <div className="indicator">
                                                <div>{(answerStats.find((student)=>student.code === person.code).count)*12}% <div style={{fontSize:15, marginBottom:5}}>complete</div></div>
                                            </div>
                                        </ProgressBar>}
                                    </div>
                                    <CardHeader>
                                        <h3 data-title="click to copy" type="button" onClick={() =>  navigator.clipboard.writeText(person.code)}>{person.code}</h3>
                                        <h6>Current score: {person.score}<button className="transparent-button float-md-end" data-title="Remove Participant" onClick={() => handleStudentDelete(person.code)}><MdDelete /></button>
                                        </h6>
                                    </CardHeader>
                                    <div className="info-person">current notification hours:</div>
                                    {fetchPingTimes(person.code).map((hour, hourIndex) => (
                                        <button data-title="edit" className="transparent-button" onClick={() => handleHourEdit(hourIndex, personIndex)} key={hourIndex}>{hour}</button>
                                    ))}
                                    {isEditHour === personIndex && <><input
                                        type="text"
                                        className="input-box"
                                        id="newHour"
                                        autoComplete="off"
                                        placeholder="example: 15:00"
                                        onChange={(e) => handleHourChange(e.target.value)}
                                    />
                                        <button className="transparent-button" onClick={() => handleHourSubmit(person.code, hour)}><MdFileDownloadDone /></button>
                                    </>}
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default StudentsList;

//answerStats.filter((object) => person.token === object.token)
//schedulerData.find((subject)=>(subject.participant === person.code))?.ping_times.sort((a, b) => a.slice(0,2) - b.slice(0,2))