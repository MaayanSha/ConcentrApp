import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../Constants';
import cookie from 'js-cookie';

const DataAPIService = async ({ research }) => {
    try {
        const dataResponse = await axios.get(API_URL + `submission/data/`, {
            headers: {
                Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
            },
            params:{
                experiment_id:research.id,
            }
        });

        const dataCollected = dataResponse.data.data;
        return dataCollected;

    } catch (error) {
        console.error(
            'Error fetching questions:',
            error?.response?.data?.error ? error.response.data.error : error.message
        );
    }
};


export default DataAPIService;
