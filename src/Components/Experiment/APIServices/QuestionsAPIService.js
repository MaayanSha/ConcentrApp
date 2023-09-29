import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../Constants';
import cookie from 'js-cookie';

const QuestionsAPIService = async ({ research, handleDataFetch }) => {
    try {
        const contextResponse = await axios.get(API_URL + 'context/', {
            headers: {
                Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
                experiment: research.name,
            },
        });

        const contextData = contextResponse.data.data;
        const contextQuestionData = [];
        const decisionQuestionData = [];

        async function fetchData(context) {
            const questionResponse = await axios.get(API_URL + 'question/', {
                headers: {
                    Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
                    experiment: research.name,
                    context: context.name,
                },
            });

            let response;
            if (context.description === "decision") {
                response = questionResponse.data.data[0];
                decisionQuestionData.push(response);
            } else if (context.description === "context") {
                response = questionResponse.data.data;
                contextQuestionData.push([response]);
            }
        }

        for (const context of contextData) {
            await fetchData(context);
        }

        handleDataFetch(decisionQuestionData, contextQuestionData, contextData);

    } catch (error) {
        console.error(
            'Error fetching questions:',
            error?.response?.data?.error ? error.response.data.error : error.message
        );
    }
};


export default QuestionsAPIService;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { API_URL } from '../../Constants';
// import cookie from 'js-cookie';
//
// const QuestionsAPIService = async ({ research, handleDataFetch }) => {
//     try {
//         const contextResponse = await axios.get(API_URL + 'context/', {
//             headers: {
//                 Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
//                 experiment: research.name,
//             },
//         });
//
//         const contextData = contextResponse.data.data;
//         const contextQuestionData = [];
//         const decisionQuestionData = [];
//
//         Promise.all(contextData.map(async (context) => {
//             const questionResponse = await axios.get(API_URL + 'question/', {
//                 headers: {
//                     Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
//                     experiment: research.name,
//                     context: context.name,
//                 },
//             });
//             if (context.description === "decision") {
//                 decisionQuestionData.push(questionResponse.data.data[0]);
//             } else if (context.description === "context") {
//                 contextQuestionData.push(questionResponse.data.data[0]);
//             }
//             //return questionResponse.data.data[0];
//         })).then(() => {
//             handleDataFetch(decisionQuestionData, contextQuestionData, contextData);
//         });
//
//     } catch (error) {
//         console.error(
//             'Error fetching questions:',
//             error?.response?.data?.error ? error.response.data.error : error.message
//         );
//     }
// };
//
//
// export default QuestionsAPIService;
