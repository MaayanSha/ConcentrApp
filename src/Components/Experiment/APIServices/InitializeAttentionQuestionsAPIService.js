import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../Constants';
import cookie from 'js-cookie';

const InitializeAttentionQuestionsAPIService = async ({ research, treeName }) => {
    try {
        const questionResponse = await axios.post(API_URL + 'question/',
            {
                experiment:research.name,
                context:treeName,
                description:"your first attention question here",
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


export default InitializeAttentionQuestionsAPIService;
