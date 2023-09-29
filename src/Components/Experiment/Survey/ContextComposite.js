import React, {useState} from "react";
import "./survey.css"
import {TbLetterA, TbLetterQ} from "react-icons/tb";
import {MdFormatListBulletedAdd, MdKeyboardDoubleArrowDown} from "react-icons/md";
import EditModal from "../EditModal";
import {AiOutlineEdit} from "react-icons/ai";
import {methods} from "../APIServices/TreeEditAPIService";
import {DEFAULT_GPT_PROMPT} from "./constants";
import ChatGPT from "./ChatGPT/ChatGPT";
import {GrAdd} from "react-icons/gr";
import {IoIosAdd} from "react-icons/io";
import {TiFlowChildren} from "react-icons/ti";

export default function ContextComposite({ ContextQuestions, research=null,context=null, view= null }) {
    const rawContexts = ContextQuestions[0].sort((a, b) => a.id - b.id);
    const [Contexts, setContexts] = useState(rawContexts[0]);
    const Tree = rawContexts.slice(1);
    const [isVisibleContexts, setIsVisibleContexts] = useState(false);
    const [isVisibleQuestions, setIsVisibleQuestions] = useState(false);
    const [visibleQuestion, setVisibleQuestion] = useState(-1);
    const [visibleQuestionID, setVisibleQuestionID] = useState(-1);
    const [isEditing, setIsEditing] = useState(false);
    const [isNewAnswer, setIsNewAnswer] = useState(false);
    const [isNewAttentionAnswer, setIsNewAttentionAnswer] = useState(-1);
    const [isAdd, setIsAdd] = useState(false);
    const [isAddQuestion, setIsAddQuestion] = useState(false);
    const [newAnswer, setNewAnswer] = useState("");
    const [newDescription, setNewDescription] = useState('');
    const [gptPrompt, setGptPrompt] = useState(DEFAULT_GPT_PROMPT);
    const [isGPT, setIsGPT] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };
    const expandContexts = () => {
        setIsVisibleContexts(!isVisibleContexts);
    };
    const expandQuestions = () => {
        setIsVisibleQuestions(!isVisibleQuestions);
        setVisibleQuestion(-1);
    };

    const toggleQuestion = (id) => {
        let currentIndex = Tree.findIndex((question) => question.id === id);
        setVisibleQuestion(currentIndex);
        setVisibleQuestionID(id);
    }


    const handleAnswerChange = (e) => {
        setNewAnswer(e.target.value);
    };
    const handleContextSubmit = () => {
        methods.handleQuestionEdit(Contexts.id, newDescription);
        Contexts.description = newDescription;
        setIsEditing(false);
        setIsGPT(false);
        resetSubmit();
    }
    const handleAttentionQuestionSubmit = () => {
        methods.handleQuestionEdit(Tree[visibleQuestion].id, newDescription);
        Tree[visibleQuestion].question = newDescription;
        setIsEditing(false);
        setIsGPT(false);
        resetSubmit();
    }
    const handlePrompt = () => {
        setIsGPT(!isGPT);
        setGptPrompt(newDescription);
    }

    const handleDescriptionChange = (e) => {
        const {value} = e.target;
        setNewDescription(value);
    }

    const addChildQuestion = () => {

    }

    const addNewAttentionQuestion = () => {
        methods.addNewQuestion(research,context).then((res)=>{Tree.push(res)});
    }

    const submitNewContextAnswer = () => {
        const answerResponse = methods.submitNewAnswer(Contexts, newAnswer);
        const displayContext = {
            ...Contexts,
            answers: Contexts.answers? [...Contexts.answers, answerResponse] : [answerResponse]
        }
        setContexts(displayContext);
        resetSubmit();
    };
    const submitNewAttentionAnswer = () => {
        const answerResponse = methods.submitNewAnswer(Tree[visibleQuestion], newAnswer);
        Tree[visibleQuestion] = {
            ...Tree[visibleQuestion],
            answers: Tree[visibleQuestion].answers ? [...Tree[visibleQuestion].answers, answerResponse] : [answerResponse]
        };
        resetSubmit();
    };

    const resetSubmit = () => {
        setNewAnswer('');
        setIsNewAnswer(false);
        setIsNewAttentionAnswer(-1);
        setIsAdd(false);
    }

    const ContextEditModal = <EditModal handleChange={handleDescriptionChange} handlePrompt={handlePrompt} handleSubmit={handleContextSubmit} setIsEditing={setIsEditing} />
    const ContextAnswersEditModal = <EditModal handleChange={handleAnswerChange} handleSubmit={submitNewContextAnswer} setIsEditing={setIsNewAnswer}/>
    const AttentionQuestionsEditModal = <EditModal handleChange={handleDescriptionChange} handlePrompt={handlePrompt} handleSubmit={handleAttentionQuestionSubmit} setIsEditing={setIsEditing} />
    const AttentionAnswersEditModal = <EditModal handleChange={handleAnswerChange} handleSubmit={submitNewAttentionAnswer} setIsEditing={setIsNewAttentionAnswer}/>

    return (
        <>
            <div className="surveyTree">
                <dt type="button" className="node" onClick={expandContexts} style={{ paddingLeft: 10 }}>
                    Contexts <MdKeyboardDoubleArrowDown/>
                </dt>
                {isVisibleContexts && (<>
                        {isEditing ? (<div>
                            {ContextEditModal}
                            {isGPT ? (<ChatGPT prompt={gptPrompt}/>) : null}
                        </div>) :(
                            <dd className="question" style={{ paddingLeft: 15 }}>
                                <TbLetterQ className="icons-letter" />
                                {Contexts.description}
                                {!view &&
                                    <button
                                        className="transparent-button"
                                        data-title="edit" onClick={handleEdit}><AiOutlineEdit
                                        className="icons"/>
                                    </button>}
                            </dd>)}
                    </>
                )}
                {isVisibleContexts && (<>{Contexts?.answers?.map((answer) => (
                    <div style={{ paddingLeft: 25 }}>
                        <TbLetterA className="icons-letter" />
                        {answer.answer}
                    </div>
                ))}
                    <div className="node">
                        {!view && <button className="transparent-button" data-title="add context" onClick={() => setIsNewAnswer(true)}><MdFormatListBulletedAdd  className="icons"/></button>}
                    </div></>)}
                {isNewAnswer && ContextAnswersEditModal}
                <div style={{paddingTop:20}}></div>
                <dt type="button" className="node" onClick={expandQuestions} style={{ paddingLeft: 10 }}>
                    Questions <MdKeyboardDoubleArrowDown/>
                </dt>
                {isVisibleQuestions && Tree?.map((question) => (
                    <div
                        type="button"
                        className="questionView"
                        onClick={() => toggleQuestion(question.id)}
                        key={question.id}>
                        {isEditing ? (<div>
                            {AttentionQuestionsEditModal}
                            {isGPT ? (<ChatGPT prompt={gptPrompt}/>) : null}
                        </div>) :(
                            <>
                                <TbLetterQ className="icons-letter" />
                                {question.description}
                                {!view && <button className="transparent-button" data-title="edit" onClick={handleEdit}><AiOutlineEdit className="icons"/></button>}
                            </>)}
                        {visibleQuestionID === question.id ? question?.answers?.map((answer, index) => (
                                <div key={index} style={{ paddingLeft: 25 }}>
                                    <TbLetterA className="icons-letter" />
                                    {answer.answer}
                                    {question.childrens?.filter((c)=>(c.related_answer === answer.id)).map((child)=>(
                                        <div style={{ paddingLeft: 50 }}>
                                            <TbLetterQ className="icons-letter" />
                                            {child.description}
                                            {child?.answers?.map((ans, index) => (
                                                <div style={{ paddingLeft: 75 }}>
                                                    <TbLetterA className="icons-letter" />
                                                    {ans.answer}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                    <div>
                                        {!view &&
                                        <button
                                            className="transparent-button"
                                            data-title="add consecutive question"
                                            onClick={addChildQuestion}>
                                        <TiFlowChildren className="icons"/>
                                        </button>
                                        }
                                    </div>
                                </div>
                            )) : null}
                        <div className="node">
                            {!view &&
                                <button
                                    className="transparent-button"
                                    data-title="add attention answer"
                                    onClick={() => setIsNewAttentionAnswer(question.id)}><MdFormatListBulletedAdd
                                    className="icons"/>
                                </button>}
                        </div>
                        {isNewAttentionAnswer === question.id && AttentionAnswersEditModal}
                    </div>
                ))}
                <div>
                    {!view && isVisibleQuestions &&
                        <button
                            className="transparent-button"
                            data-title="add attention question"
                            onClick={() => addNewAttentionQuestion()}><IoIosAdd className="icons"/></button>}
                </div>
            </div>
        </>

    );
};
