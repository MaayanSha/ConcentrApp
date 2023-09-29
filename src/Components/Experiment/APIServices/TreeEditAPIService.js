import axios from "axios";
import {API_URL} from "../../../Constants";
import cookie from "js-cookie";
import {useState} from "react";


export const methods = {

    handleQuestionEdit:(id, description) => {
        axios.patch(API_URL+`question/${id}/`, {description: description}, {
            headers: {
                'Authorization': `Bearer ${cookie.get('jwt-authorization')}`
            }
        }).then().catch((error) => {
            console.error("Error editing question:", error?.response?.data?.error ?
                error.response.data.error
                : error.message);
        });
    },
    handleDeleteQuestion:(id) => {
        axios.delete(API_URL+`question/${id}/`,{
            headers: {
                'Authorization': `Bearer ${cookie.get('jwt-authorization')}`
            },
        }).then().catch((error) => {
            console.error("Error editing question:", error?.response?.data?.error ?
                error.response.data.error
                : error.message);
        });
    },

    handleAnswerEdit:(answer_id, newAnswer, context) => {
        axios.patch(API_URL+`answer/${answer_id}/`, {text:newAnswer}, {
            headers: {
                'Authorization': `Bearer ${cookie.get('jwt-authorization')}`
            }
        }).then().catch((error) => {
            console.error("Error editing answer:", error?.response?.data?.error ?
                error.response.data.error
                : error.message);
        });
    },

    addChildQuestion: async (ans_id, ans_title, research, context, currentQuestion) => {
        const newQuestion = {
            experiment:research.name,
            context:context,
            description: `your question for answer '${ans_title}'`,
            related_answer: ans_id,
            parent_id: currentQuestion.id,
        };
        try{
        const questionResponse = await axios.post(API_URL+"question/", newQuestion, {
            headers: {
                'Authorization': `Bearer ${cookie.get('jwt-authorization')}`,
            }
        });
        return questionResponse.data.data;
        }
        catch (error) {
            console.error(
                'Error posting question:',
                error?.response?.data?.error ? error.response.data.error : error.message
            );
        }
    },
    addNewQuestion: async (research, context) => {
        const newQuestion = {
            experiment:research.name,
            context:context,
            description: `your next attention question here`,
        };
        try{
            const questionResponse = await axios.post(API_URL + "question/", newQuestion, {
                headers: {
                    'Authorization': `Bearer ${cookie.get('jwt-authorization')}`,
                }
            });
            return questionResponse.data.data;
        }
        catch (error) {
            console.error(
                'Error posting question:',
                error?.response?.data?.error ? error.response.data.error : error.message
            );
        }
    },

    submitNewAnswer:async (currentQuestion, newAnswer) => {
        try {
            const answerResponse = await axios.post(API_URL + "answer/", {
                question_id: currentQuestion.id,
                text: newAnswer
            }, {
                headers: {
                    'Authorization': `Bearer ${cookie.get('jwt-authorization')}`,
                }
            });
            return answerResponse.data.data;
        }catch (error) {
            console.error(
                'Error posting question:',
                error?.response?.data?.error ? error.response.data.error : error.message
            );
        }
    },

    handleDeleteAnswer:(id) => {
        axios.delete(API_URL+`answer/${id}/`, {
            headers: {
                'Authorization': `Bearer ${cookie.get('jwt-authorization')}`
            },
        }).then().catch((error) => {
            console.error("Error editing answer:", error?.response?.data?.error ?
                error.response.data.error
                : error.message);
        });
    },
}