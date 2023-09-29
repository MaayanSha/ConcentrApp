import React, { useState } from "react";
import "./survey.css";
import axios from "axios";
import {TbDots, TbLetterA, TbLetterQ} from "react-icons/tb";

export default function SurveyComposite({ SurveyTree }) {
    const currentTree = SurveyTree;
    const [isVisible, setIsVisible] = useState(false);

    const expand = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="surveyTree">
            <div style={{ paddingLeft: 5 }}>
                <div className="btn-group">
                    <dt type="button" className="node" onClick={expand}>
                        <TbLetterQ className="icons-letter" />
                        {currentTree.description}
                    </dt>
                </div>
            </div>
            <div>
                {isVisible &&
                    currentTree.description &&
                    currentTree?.answers?.map((answer) => (
                        <div key={answer.id} style={{marginLeft:25}}>
                            <dl type="button">
                                <TbLetterA className="icons-letter" />
                                {answer.text? answer.text : answer.answer}
                            </dl>
                            {isVisible &&
                                currentTree?.childrens
                                    ?.filter((child) => child.related_answer === answer.id)
                                    .map((childObj) => (
                                        <dd key={childObj.id}>
                                            <dl>
                                                <div style={{ marginLeft: 15 }}>
                                                    <SurveyComposite SurveyTree={childObj} />
                                                </div>
                                            </dl>
                                        </dd>
                                    ))}
                        </div>
                    ))}
            </div>
        </div>
    );
}
