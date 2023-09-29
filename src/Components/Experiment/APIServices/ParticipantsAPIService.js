import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../Constants';
import cookie from 'js-cookie';

const ParticipantsAPIService = async ({ research, handleDataFetch }) => {
        try {
            const contextResponse = await axios.get(API_URL + 'context/', {
                headers: {
                    Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
                    experiment: research.name,
                },
            });

            const contextData = contextResponse.data.data;
        const participantResponse = await axios.get(API_URL + 'participants/', {
            headers: {
                Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
            },
            params: {
                experiment:research.id,
            }
        });
//this is an array of {code: ,score:, gender:}
        const participants = participantResponse.data.data;
        const schedulerResponse = await axios.get(API_URL + 'scheduler/', {
            headers: {
                Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
            },
            params: {
                experiment_id:research.id,
            }
        });
        //this is an array of {participant, ping_times[], experiment id, context id}
        const schedulerData = schedulerResponse.data.data
        handleDataFetch(participants, schedulerData, contextData);

    } catch (error) {
        console.error(
            'Error fetching questions:',
            error?.response?.data?.error ? error.response.data.error : error.message
        );
    }
};


export default ParticipantsAPIService;
