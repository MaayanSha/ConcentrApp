import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../Constants';
import cookie from 'js-cookie';

const InitializeQuestionsAPIService = async ({ research, treeName, isDecision }) => {
    try {
             const contextResponse = await axios.post(API_URL + 'context/',
            {
                experiment:research.name,
                name:treeName,
                description:isDecision? "decision" : "context",
            },
            {
                headers: {
                    Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
                },
            });
        const contextName = contextResponse.data.data.name;
        const questionTitle = isDecision ? "your first question here" : "your first context question here"
        const questionResponse = await axios.post(API_URL + 'question/',
            {
                experiment:research.name,
                context:contextName,
                description:questionTitle,
            },
            {
            headers: {
                Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
            },
        });
        return questionResponse.data.data;
    } catch (error) {
        console.error(
            'Error posting question:',
            error?.response?.data?.error ? error.response.data.error : error.message
        );
    }
};


export default InitializeQuestionsAPIService;
