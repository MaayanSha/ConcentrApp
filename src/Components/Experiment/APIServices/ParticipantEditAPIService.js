import axios from "axios";
import {API_URL} from "../../../Constants";
import cookie from "js-cookie";

export const ParticipantEditAPIService = {
    editHour: (participantId, oldTime ,newTime) => {
        axios.put(API_URL+`participants/${participantId}/`,{old_time:oldTime, new_time:newTime},{
            headers: {
                'Authorization': `Bearer ${cookie.get('jwt-authorization')}`
            },
        }).then().catch((error) => {
            console.error("Error deleting participant:", error?.response?.data?.error ?
                error.response.data.error
                : error.message);
        });
    },
    deleteParticipant: (participantId) => {
        axios.delete(API_URL+`participants/${participantId}/`,{
            headers: {
                'Authorization': `Bearer ${cookie.get('jwt-authorization')}`
            },
        }).then().catch((error) => {
            console.error("Error deleting participant:", error?.response?.data?.error ?
                error.response.data.error
                : error.message);
        });
    }
}