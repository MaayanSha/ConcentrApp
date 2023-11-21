
//this file defines the logic that builds the data components for the visualization models

// import totalParticipants from "../"
// import contexts from "../"

//get total participants > get pings for each participant > get answers > calculate total answer rate
export const dataAggregationModal = {
    answerRateToday: (answerData)=> {
        const totalParticipants = [{context:"Trial 3 Context"}, {context:"Trial 3 Context"},{context:"Trial 3 Context"}, {context:"Trial 3 Decision"}, {context:"Trial 3 Context"},{context:"Trial 3 Context"}, {context:"Trial 3 Decision"}, {context:"Trial 3 Decision"}, {context:"Trial 3 Context"},{context:"Trial 3 Context"}, {context:"Trial 3 Decision"}, {context:"Trial 3 Decision"}, {context:"Trial 3 Context"}]
        //api call contexts instead
        const contexts = ["Trial 3 Context", "Trial 3 Decision"];
        const expectedAnswerRate = (context)=>{
            let totalExpected = 0;
            totalParticipants.forEach(function (person){
                if (person.context === context) {
                    totalExpected += 3;
                }
            })
            return totalExpected;
        }
        //divide by context
        const dataContext = [];
        contexts.forEach((context) =>  {
            const answerCount = answerData.filter((answer) => answer.context === context).length;
            dataContext.push({context: context, rate:(answerCount/expectedAnswerRate(context))});
        })
        return dataContext;
    },

    totalAnswersPerContext: (answerData)=> {
        //api call contexts instead
        const contexts = ["Trial 3 Context", "Trial 3 Decision", "Trial Tester Questions"];
        const dataContext = [];
        contexts.forEach((context) =>  {
            const answerCount = answerData.filter((answer) => answer.context === context).length;
            dataContext.push({id:context, label: context, value:answerCount});
        })
        return dataContext;
    },
    answerRatePerUser: (answerData, userList)=> {
        const userData = [];
        //api call students instead
        //const userList = ["pyXohwL8MTzWbZE", "vpmInU062coMv3v", "PNUACAlOtixK6WJ", "tIIpo2MR8v4fxxV"];
        userList.forEach((user) =>  {
            const answerCount = answerData.filter((answer) => answer.participant === user.code).length;
            userData.push({code:user.code, count:answerCount});
        });
        return userData;
    }

}