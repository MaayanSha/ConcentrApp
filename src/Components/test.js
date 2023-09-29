import React, { useState } from "react";

const answers_time =[
    {
        id:11,
        title:"Not at all",
    },
    {
        id:12,
        title:"a little",
    },
    {
        id:13,
        title:"some of the time",
    },
    {
        id:14,
        title:"most of the time",
    },
    {
        id:15,
        title:"all of the time",
    },
]

const SurveyTree = {
    id: 1,
    description: "description_for_question1",
    created_at: "2023-05-31T11:49:09.273662Z",
    updated_at: "2023-05-31T11:49:09.282746Z",
    related_ans:-1,
    answers: answers_time,
    childrens: [
        {
            id: 2,
            description: "appears if answer is 1",
            created_at: "2023-05-31T11:50:04.609380Z",
            updated_at: "2023-05-31T11:50:04.615400Z",
            answers: answers_time,
            related_ans:11,
            childrens: [
                {
                    id: 5,
                    description: "appears if question 2 answer 1",
                    created_at: "2023-05-31T11:50:25.158418Z",
                    updated_at: "2023-05-31T11:50:25.164656Z",
                    answers: answers_time,
                    related_ans:11,
                    childrens: []
                }
            ]
        },
        {
            id: 3,
            description: "appears if answer is 2",
            created_at: "2023-05-31T11:50:11.747726Z",
            updated_at: "2023-05-31T11:50:11.752881Z",
            answers: answers_time,
            related_ans:12,
            childrens: []
        },
    ]
}

function SurveyComposite({ SurveyTree }) {
    const currentTree = SurveyTree;

    return (
        <div>
            {currentTree.description}
            <div>
                {currentTree?.answers?.map((answer) => (
                    <div key={answer.id}>
                        {answer.answer}
                        {currentTree?.childrens
                            ?.filter((child) => child.related_answer === answer.id)
                            .map((childObj) => (
                                <div key={childObj.id} style={{ marginLeft: 15 }}>
                                    <SurveyComposite SurveyTree={childObj} />
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}