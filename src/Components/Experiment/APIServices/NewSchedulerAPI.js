import axios from "axios";
import {API_URL} from "../../../Constants";
import cookie from "js-cookie";


const NewSchedulerAPI = (participantCode, chosenHours, research, context) => {
    try{
        return axios.post(API_URL + 'scheduler/',
            {
                participant: participantCode,
                time: chosenHours.map(hour => hour.toString().padStart(2, '0') + ":00"),
                experiment_id: research.id,
                context_id: context
            }, {
                headers: {
                    Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
                },
            });
    } catch (error) {
        console.error(
            'Error fetching questions:',
            error?.response?.data?.error ? error.response.data.error : error.message
        );
    }
};

export default NewSchedulerAPI;