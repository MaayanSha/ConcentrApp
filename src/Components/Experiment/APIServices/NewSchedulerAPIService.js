import axios from "axios";
import {API_URL} from "../../../Constants";
import cookie from "js-cookie";

const makeSchedulerRequest = async (participantCode, chosenHours, experimentId, context) => {
    try {
        const schedulerResponse = await axios.post(API_URL + 'scheduler/', {
            participant: participantCode,
            time: chosenHours.map(hour => hour.toString().padStart(2, '0') + ":00"),
            experiment_id: experimentId,
            context_id: context,
        }, {
            headers: {
                Authorization: `Bearer ${cookie.get('jwt-authorization')}`,
            },
        });

        return schedulerResponse;
    } catch (error) {
        console.error(
            'Error making scheduler request:',
            error?.response?.data?.error ? error.response.data.error : error.message
        );
    }
};

export default makeSchedulerRequest;