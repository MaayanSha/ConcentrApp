import React from 'react';
import axios from 'axios';
import {API_URL} from '../../../Constants';
import cookie from 'js-cookie';

const NewParticipantsAPIService = (research, context, gender, setParticipantCode) => {
    try {
        axios.post(API_URL + 'participants/', {
            experiment_id: research.name,
            gender: gender,
        }, {
            headers: {
                Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
            },
        }).then((response) => {console.log(response.data.data.participant.participant_code);setParticipantCode(response.data.data.participant.participant_code)});
    } catch (error) {
        console.error(
            'Error fetching data:',
            error?.response?.data?.error ? error.response.data.error : error.message
        );
    }
};
export default NewParticipantsAPIService;



// const NewParticipantsAPIService = async (research, context, gender, chosenHours, handleDataFetch) => {
//     try {
//         const participantResponse = await axios.post(API_URL + 'participants/',
//             {experiment_id:research.name,
//                 gender:gender,
//         },{
//             headers: {
//                 Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
//             },
//         });
// //this is an array of {code: ,score:}
//         const participantCode = participantResponse.data.data.participant.participant_code;
//         const schedulerResponse = await axios.post(API_URL + 'scheduler/',
//             {
//                 participant:participantCode,
//                 time: chosenHours.map(hour => hour.toString().padStart(2, '0')+":00"),
//                 experiment_id:research.id,
//                 context_id:context
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
//                 },
//             });
//         return schedulerResponse;
//     } catch (error) {
//         console.error(
//             'Error fetching questions:',
//             error?.response?.data?.error ? error.response.data.error : error.message
//         );
//     }
// };
//
//