import React from "react"
import {action, makeAutoObservable, makeObservable, observable, get, set, autorun} from "mobx"
import { observer } from "mobx-react-lite"
import axios from "axios";
import {API_URL} from "../Constants";
import cookie from "js-cookie";

class Research{
    allResearches = [];
    isInitialized = false;
    constructor() {
        makeObservable(this,{
            allResearches: observable,
            getResearches: action,
        });
    }

    getResearches = () => {
        axios.get(API_URL+"experiments/", {
            headers: {
                'Authorization': `Bearer ${cookie.get('jwt-authorization')}`
            }
        }).then(res => {set(this.allResearches,Array.from(res.data.data))}).catch((error) => {
            console.error("Error fetching researches:", error?.response?.data?.error ?
                error.response.data.error
                : error.message);
        });
    }


}
export const research = new Research();
