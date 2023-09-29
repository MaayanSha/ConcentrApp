import React, {useState} from 'react';
import "./survey.css";
import { AiOutlineEdit } from 'react-icons/ai'
import {MdFormatListBulletedAdd} from "react-icons/md";
import {TbLetterA, TbLetterQ} from "react-icons/tb";
import {TiFlowChildren} from "react-icons/ti";
import EditModal from "../EditModal";
import {methods} from "../APIServices/TreeEditAPIService";
import ChatGPT from "./ChatGPT/ChatGPT";
import {
    TRANSPARENT_BUTTON_STYLE,
    INDENTATION,
    INITIAL_MARGIN_LEFT,
    DEFAULT_QUESTION_DESCRIPTION,
    DEFAULT_NEW_ANSWER,
    DEFAULT_EDITING_ANSWER,
    DEFAULT_GPT_PROMPT,
    DEFAULT_CHILD_QUESTION_DESCRIPTION,
    BUTTON,
    EDIT_TITLE,
    ADD_TITLE,
    CONSECUTIVE_QUESTIONS
} from './constants';
import {
    BTN_GROUP,
    NODE,
    ICONS_LETTER,
    ICONS,
    CURR_QUESTION,
    ANSWER_TITLE,
    LIST_GROUP_ITEM,
    SURVEY_TREE,
    QUESTION,
    INDENT_PADDING_LEFT,
} from './classNames';

const NewDecisionTreeQuestionForm = ({ questionObj, research, context}) => {
    const [currentQuestion, setCurrentQuestion] = useState(questionObj);
    const [isQuestionEditing, setIsQuestionEditing] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isNewAnswer, setIsNewAnswer] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [newAnswer, setNewAnswer] = useState(DEFAULT_NEW_ANSWER);
    const [description, setDescription] = useState(currentQuestion.description || DEFAULT_QUESTION_DESCRIPTION);
    const [isEditingAnswer, setIsEditingAnswer] = useState(DEFAULT_EDITING_ANSWER);
    const [gptPrompt, setGptPrompt] = useState(DEFAULT_GPT_PROMPT);
    const [isGPT, setIsGPT] = useState(false);

    //this is the function that is called when the user clicks the edit button
    const handleQuestionChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        setDescription(value);
    };
    //this is controlling the current expanded state of the object
    // for easier and tidier UI
    const expand = () => {
        setIsVisible(!isVisible);
    };
    //toggle the edit state of the question, opens the modal
    const toggleQuestionEdit = () => {
        setIsQuestionEditing(!isQuestionEditing);
        setIsGPT(false);
    };
    //toggle the edit state of the answer, opens the modal
    const toggleAnswerEdit = (id) => {
        setIsEditingAnswer(id);
    };

    //this is the add answer button
    const handleAddAnswer = () => {
        setIsNewAnswer(true);
        setIsAdd(true);
    };

    //listens to the input field for the new answer
    const handleAnswerChange = (e) => {
        setNewAnswer(e.target.value);
    };

    //when the input has been finalized, this is called.
    //methods is the API service caller
    // a local copy of the new edit is saved to save on API calls
    const handleQuestionEdit = (id) => {
        methods.handleQuestionEdit(id, description, research, context);
        currentQuestion.description = description;
        setIsQuestionEditing(false);
        setIsGPT(false);
    };

    //this activates the GPT chatbot and sends the question to the backend
    const handlePrompt = () => {
        setIsGPT(!isGPT);
        setGptPrompt(description);
    }

    //this is the delete button for the question
    const handleDeleteQuestion = (id) => {
        methods.handleDeleteQuestion(id);
        setIsQuestionEditing(false);
    };

    //this is the edit method for the answer
    //methods is the API service caller
    //updates the local copy of the answer to save on API calls
    const handleAnswerEdit = (answer_id) => {
        methods.handleAnswerEdit(answer_id, newAnswer, context);
        currentQuestion.answers.find((answer)=>(answer.id === answer_id)).answer = newAnswer;
        setIsEditingAnswer('');
    }

    //this is the add consecutive question button
    //ands a new child question with the answer id
    //methods is the API service caller
    //updates the local copy of the answer to save on API calls
    const addChildQuestion = async (ans_id, ans_title) => {
        const questionResponse = await methods.addChildQuestion(ans_id, ans_title, research, context, currentQuestion);
        setCurrentQuestion( (prevQuestion) => {
            const updatedQuestion = {...prevQuestion};

            const updatedChildren = updatedQuestion.childrens ? [...updatedQuestion.childrens, questionResponse] : [questionResponse];
            updatedQuestion.childrens = updatedChildren;

            return updatedQuestion;
        });
    };

    //this is the method that submits new answers
    //methods is the API service caller
    //updates the local copy of the answer to save on API calls
    const submitNewAnswer = async () => {
        const answerResponse = await methods.submitNewAnswer(currentQuestion, newAnswer);
        const displayQuestion = {
            ...currentQuestion,
            answers: currentQuestion.answers ? [...currentQuestion.answers] : [],
        };
        displayQuestion.answers.push(answerResponse);
        setCurrentQuestion(displayQuestion);
        setIsNewAnswer(false);
        setIsAdd(false);
    };

    //this is the delete button for the answer
    const handleDeleteAnswer = (id) => {
        methods.handleDeleteAnswer(id);
        const newAnswers = currentQuestion.answers.filter(
            (answer) => answer.id !== id
        );
        setCurrentQuestion({ ...currentQuestion, answers: newAnswers });
    };
    //these are the modals that are used for editing
    //each modal receives the appropriate props
    const QuestionEdit =  <EditModal handleChange={handleQuestionChange} handleSubmit={handleQuestionEdit} handlePrompt={handlePrompt} setIsEditing={toggleQuestionEdit} handleDelete={handleDeleteQuestion} id={currentQuestion.id}/>
    const AnswerEdit =  <EditModal handleChange={handleAnswerChange} handleSubmit={handleAnswerEdit} setIsEditing={setIsEditingAnswer} handleDelete={handleDeleteAnswer} id={isEditingAnswer}/>
    const NewAnswerEdit = <EditModal handleChange={handleAnswerChange} handleSubmit={submitNewAnswer} setIsEditing={handleAddAnswer}/>

    return (
        <div className={SURVEY_TREE}>
            <div style={{ paddingLeft: INDENT_PADDING_LEFT }}>
                <div className={BTN_GROUP}>
                    <dt
                        type={BUTTON}
                        className={NODE}
                        onClick={!isQuestionEditing ? expand : null}>
                    {isQuestionEditing ? (
                        <div>
                            {QuestionEdit}
                            {isGPT ? (<ChatGPT prompt={gptPrompt}/>) : null}
                        </div>
                    ) : (
                        <div className={CURR_QUESTION}>
                            <TbLetterQ className={ICONS_LETTER}/>
                            {currentQuestion.description}
                            <button
                                type={BUTTON}
                                data-title={EDIT_TITLE}
                                className={TRANSPARENT_BUTTON_STYLE}
                                onClick={toggleQuestionEdit}>
                                <AiOutlineEdit className={ICONS}/>
                            </button>
                        </div>
                    )}
                    </dt>
                </div>
            </div>
            <div>
                {isVisible && currentQuestion.description && (
                    <dd className={QUESTION} style={{ marginLeft: INDENTATION }}>
                        {
                            currentQuestion?.answers?.map((answer) => {
                                const existingChild = currentQuestion.childrens?.find((child) => child.related_answer === answer.id);
                                const hasBeenAddedChild = existingChild ? answer.id : null;
                                return (
                                    <>
                                        <div className={LIST_GROUP_ITEM}>
                                            {isEditingAnswer === answer.id ? (
                                                AnswerEdit
                                            ):(
                                                <div className={ANSWER_TITLE} key={answer.id}>
                                                    <TbLetterA className={ICONS_LETTER}/> {answer.text? answer.text : answer.answer}
                                                    <button
                                                        type={BUTTON}
                                                        data-title={EDIT_TITLE}
                                                        className={TRANSPARENT_BUTTON_STYLE}
                                                        onClick={()=>toggleAnswerEdit(answer.id)}>
                                                        <AiOutlineEdit className={ICONS}/>
                                                    </button>
                                                </div>
                                            )}
                                            {hasBeenAddedChild === null && (
                                                <button
                                                    type={BUTTON}
                                                    data-title={CONSECUTIVE_QUESTIONS}
                                                    className={TRANSPARENT_BUTTON_STYLE}
                                                    onClick={() => {addChildQuestion(answer.id, answer.text, currentQuestion.id)}}
                                                >
                                                    <TiFlowChildren className={ICONS} />
                                                </button>
                                            )}
                                        </div>
                                        {isVisible &&
                                            currentQuestion?.childrens?.filter((child) => child.related_answer === answer.id)
                                                .map((childObj) => (
                                                        <dd key={childObj.id}>
                                                            <dl>
                                                                <div style={{ marginLeft: INDENTATION }}>
                                                                    <NewDecisionTreeQuestionForm
                                                                        questionObj={childObj}
                                                                        research={research}
                                                                        context={context} />
                                                                </div>
                                                            </dl>
                                                        </dd>
                                                    )
                                                )}
                                    </>
                                );
                            })
                        }

                    </dd>

                )}
                {isVisible && !isAdd && (
                    <button
                        type={BUTTON}
                        data-title={ADD_TITLE}
                        className={TRANSPARENT_BUTTON_STYLE}
                        onClick={handleAddAnswer}
                        style={{ marginLeft: INITIAL_MARGIN_LEFT }}>
                        <MdFormatListBulletedAdd  className={ICONS}/>
                    </button>
                )}
                {isNewAnswer && (
                    <div style={{ marginLeft: INITIAL_MARGIN_LEFT }}>
                        {NewAnswerEdit}
                    </div>
                )}
            </div>
        </div>
    );
}
export default NewDecisionTreeQuestionForm;