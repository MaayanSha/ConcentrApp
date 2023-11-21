import React from "react"
import {action, makeAutoObservable, makeObservable, observable} from "mobx"
import {research} from "../Research";


export class currentResearch {
    currentResearch = {};
    constructor(researchList) {
        makeObservable(this,{
            currentResearch: observable,
            setCurrentResearch: action,
        });
        this.researchList = researchList;
    }

    setCurrentResearch = (id) => {
        this.currentResearch = this.researchList.find((research) => research.id === id);
    }
}
export const currentResearchStore = new currentResearch(research.allResearches);
