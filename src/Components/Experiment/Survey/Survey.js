import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import SurveyComposite from "./SurveyComposite"
import ContextComposite from "./ContextComposite"
import "./survey.css"
import decision from "../../../images/decision.svg"
import context from "../../../images/context.svg"
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import NewDecisionTreeQuestionForm from "./NewDecisionTreeQuestionForm";
import {MdExpandCircleDown} from "react-icons/md";
import {TbChartDots3} from "react-icons/tb";
import QuestionsAPIService from "../APIServices/QuestionsAPIService"
import InitializeQuestionsAPIService from "../APIServices/InitializeQuestionsAPIService";
import InitializeAttentionQuestionsAPIService from "../APIServices/InitializeAttentionQuestionsAPIService";
import SurveyMenu from "./SurveyMenu";
import ChatGPT from "./ChatGPT/ChatGPT";

export default function Survey(props) {
    const location = useLocation()
    const { research } = location.state
    const [decisionSchemes, setDecisionSchemes] = useState([]);
    const [context_schemes, setContextSchemes] = useState([]);
    const [isNewDecision, setIsNewDecision] = useState(false);
    const [isNewContext, setIsNewContext] = useState(false);
    const [openDecisionTree, setOpenDecisionTree] = useState(false);
    const [openContextTree, setOpenContextTree] = useState(false);
    const [currentContextList, setCurrentContextList] = useState([]);
    const [currentDecisionList, setCurrentDecisionList] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [treeName, setTreeName] = useState('');
    const [newQuestion, setNewQuestion] = useState('');
    const [newContext, setNewContext] = useState('');
    const [newAttentionQuestion, setNewAttentionQuestion] = useState('');
    const [startNewTree, setStartNewTree] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editDecisionSchemeId, setEditDecisionSchemeId] = useState(null);
    const [showDecisionSchemeId, setShowDecisionSchemeId] = useState(null);
    const [editContextSchemeId, setEditContextSchemeId] = useState(null);
    const [showContextSchemeId, setShowContextSchemeId] = useState(null);
    const [contextTreeInit, setContextTreeInit] = useState([]);
    const [contextNewQuestion, setContextNewQuestion] = useState(null);

    const editContextTree = (schemeId) => {
        setEditContextSchemeId(schemeId);
    };

    const viewContextTree = (schemeId) => {
        setShowContextSchemeId(schemeId);
    };

    const editDecisionTree = (schemeId) => {
        setEditDecisionSchemeId(schemeId);
    };

    const viewDecisionTree = (schemeId) => {
        setShowDecisionSchemeId(schemeId);
    };

    const newDecisionTree = () => {
        setIsNewDecision(!isNewDecision);
    }
    const newContextTree = () => {
        setIsNewContext(!isNewContext);
    }
    const onChangeTreeName = (e) => {
        setTreeName(e.target.value);
    }

    const handleDataFetch = (decisionQuestionData,contextQuestionData, contextList) => {
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        setDecisionSchemes(decisionQuestionData);
        setContextSchemes(contextQuestionData);
        const tempContext = [];
        const tempDecision = [];
        contextList.map((item) => {
            if (item.description === 'decision') {
                tempDecision.push(item);
            } else {
                tempContext.push(item);
            }
        });
        setCurrentContextList(tempContext);
        setCurrentDecisionList(tempDecision);
        sleep(1000).then(() => {
            setIsLoading(false)
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await QuestionsAPIService({ research, handleDataFetch });
            } catch (error) {
                console.error(
                    'Error fetching questions:',
                    error?.response?.data?.error ? error.response.data.error : error.message
                );
            }
        };

        fetchData();
    },[isUpdated]);

    const updateData = () => {
            setIsLoading(true);
            setIsUpdated(!isUpdated);
    };

    const initTree = async (type) => {
        try {
            //type 1 = decision tree
            if (type === 1) {
                let isDecision = true;
                const question = await InitializeQuestionsAPIService({research, treeName, isDecision})
                setNewQuestion(question);
                setContextNewQuestion(question.context);
                setTreeName('');
            }
            else if (type === 2){
                let isDecision = false;
                const contextQuestion = await InitializeQuestionsAPIService({research, treeName, isDecision})
                setNewContext(contextQuestion);
                setContextNewQuestion(contextQuestion.context);
            }
        }
        catch (error) {
            console.error(
                'Error fetching questions:',
                error?.response?.data?.error ? error.response.data.error : error.message
            );
        }

    }
    const initAttenQuestion = async () => {
        try{
            const attenQuestion = await InitializeAttentionQuestionsAPIService({research, treeName})
            setNewAttentionQuestion(attenQuestion);
            setTreeName('');
        }
        catch (error){
            console.error(
                'Error fetching questions:',
                error?.response?.data?.error ? error.response.data.error : error.message
            );
        }
    }

    return (
        <div className="column-wrapper">
            <div className="column-1">
                <SurveyMenu research={research}/>
            </div>
        <div className="column-2">
                <h1 className="h1X">
                    Custom Questionnaire Generator
                </h1>
                <div className="row">
                    <h3 className="h3X">
                        <b>Choose</b> a scheme to start:
                    </h3>
                    <div className="image-containerX">
                        <div className="imageX">
                            <img src={decision} alt="Decision Tree" />
                            <div  onClick={newDecisionTree} className="image-overlayX">
                                <div className="image-text">Decision Tree Style</div>
                            </div>
                            <Modal isOpen={isNewDecision} toggle={newDecisionTree} onClosed={()=> {updateData();setStartNewTree(false)}}>
                                {!startNewTree &&
                                    <ModalHeader>
                                        Please name the tree
                                        <input className="input-box" onChange={onChangeTreeName} onKeyDown={(e) => {
                                            if (e.key === 'Enter'){
                                                initTree(1).then(r => setStartNewTree(true));
                                            }
                                        }}/>
                                    </ModalHeader>
                                }
                                {startNewTree &&
                                    <ModalBody>
                                        <NewDecisionTreeQuestionForm
                                            questionObj={newQuestion}
                                            context={contextNewQuestion.name}
                                            research={research}/>
                                    </ModalBody>
                                }
                            </Modal>
                        </div>
                        <h3 className="h3X">
                            <b style={{marginRight: 20}}>or</b>
                        </h3>
                        <div className="imageX">
                            <img src={context} alt="Context Questions" />
                            <div onClick={newContextTree} className="image-overlayX">
                                <div className="image-text">Context-based Questions</div>
                            </div>
                            <Modal isOpen={isNewContext} toggle={newContextTree} onClosed={updateData}>
                                {!startNewTree &&
                                    <ModalHeader>
                                        Please name the tree
                                        <input onChange={onChangeTreeName} onKeyDown={(e) => {
                                            if (e.key === 'Enter'){
                                                initTree(2).then(initAttenQuestion).then(r => setStartNewTree(true));
                                            }
                                        }}/>
                                    </ModalHeader>
                                }
                                {startNewTree &&
                                    <ModalBody>
                                        <ContextComposite ContextQuestions={[[newContext,newAttentionQuestion]]} />
                                    </ModalBody>
                                }
                            </Modal>
                        </div>
                    </div>
                    <div className="row">
                        <h3 className="h3X">
                            <b>Edit</b> an existing scheme:
                        </h3>
                        <h3 className="h3X" type="button" onClick={() => {setOpenDecisionTree(!openDecisionTree);}}>
                            Your Decision Trees <MdExpandCircleDown />
                        </h3>
                        {openDecisionTree && (
                            <div className="hidden-context">
                                {!decisionSchemes || decisionSchemes.length <= 0 ? (
                                    <h3 className="h3X">No active schemes</h3>
                                ) : (
                                    <>
                                        {!isLoading ? (
                                            decisionSchemes.map((scheme, index) => (
                                                <div key={scheme.id}>
                                                    <div className="scheme">
                                                        <TbChartDots3 className="scheme-icons" />
                                                        {currentDecisionList[index].name}
                                                    </div>
                                                    <button className="transparent-button" onClick={()=> editDecisionTree(scheme.id)}>
                                                        edit
                                                    </button>
                                                    <button className="transparent-button" onClick={()=> viewDecisionTree(scheme.id)}>
                                                        view
                                                    </button>
                                                    <Modal isOpen={editDecisionSchemeId === scheme.id} toggle={() => editDecisionTree(null)} onClosed={updateData}>
                                                        <ModalBody>
                                                                <NewDecisionTreeQuestionForm
                                                                    questionObj={scheme}
                                                                    context={currentDecisionList[index].name}
                                                                    research={research}
                                                                    updateData={updateData}
                                                                />
                                                        </ModalBody>
                                                    </Modal>
                                                    <Modal isOpen={showDecisionSchemeId === scheme.id} toggle={() => viewDecisionTree(null)}>
                                                        <ModalBody>
                                                            <SurveyComposite SurveyTree={scheme} />
                                                        </ModalBody>
                                                    </Modal>
                                                </div>
                                            ))
                                        ) : (
                                            <div>Loading Data...</div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                        <h3 className="h3X" type="button" onClick={() => {setOpenContextTree(!openContextTree);}}>
                            Your Context-based Schemes <MdExpandCircleDown />
                        </h3>
                        <div className="modal-background">
                            {openContextTree &&
                                <div>
                                    {!context_schemes || context_schemes.length <= 0 ? (
                                        <h3 className="h3X"> No active schemes </h3>
                                    ) : (<>{!isLoading ? (
                                        context_schemes.map((scheme, index) => (
                                            <>
                                                <div className="scheme" onClick={editContextTree}><TbChartDots3 className="scheme-icons"/>{currentContextList[5].name}</div>
                                                <button className="transparent-button" onClick={()=> editContextTree(index)}>
                                                    edit
                                                </button>
                                                <button className="transparent-button" onClick={()=> viewContextTree(index)}>
                                                    view
                                                </button>
                                                <Modal isOpen={editContextSchemeId === index} toggle={() => editContextTree(null)} onClosed={updateData}>
                                                    <ModalBody>
                                                        <ContextComposite ContextQuestions={scheme} research={research} context={currentContextList[index].name} />
                                                    </ModalBody>
                                                </Modal>
                                                <Modal isOpen={showContextSchemeId === index} toggle={() => viewContextTree(null)}>
                                                    <ModalBody>
                                                        <ContextComposite ContextQuestions={scheme} view={true} />
                                                    </ModalBody>
                                                </Modal>
                                            </>
                                        ))
                                    ) : (
                                        <div> Loading Data... </div>
                                        )}</>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                </div>
        </div>
            <div className="column-3">
            </div>
        </div>

    );

}
