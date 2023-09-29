import axios from "axios";
import {useEffect, useState} from "react";
import {GPT} from "../../../../Constants";
import cookie from "js-cookie";
import {API_KEY} from "../../../../api";
import {Modal, ModalBody} from "reactstrap";
import {AiOutlineClose} from "react-icons/ai";
import {VscHubot} from "react-icons/vsc";
import {SiOpenai} from "react-icons/si";
import {system_prompt} from "./GPTPrompts";

export default function ChatGPT({prompt}) {
    const [response, setResponse] = useState("");
    const [suggestions,setSuggestions] = useState([]);
    const [isResponse, setIsResponse] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleSubmit = async () => {
        console.log("pulling from GPT");
        await axios.post(GPT, {
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },}
            )
            .then((res) => {
                setResponse(res.data.choices[0].message.content);
                setError(null);
            })
            .catch((err) => {
                console.error(err);
                setError("Something went wrong")
            });
    };

    const toggleResponse = () => {
        setIsResponse(true);
        handleSubmit().then(r => responseToSuggestions());
    }
    const responseToSuggestions = () => {
        const _suggestions = [];
        response.split("\n").map((suggestion) => {
            _suggestions.push(suggestion);
        });
        if (_suggestions.length === 0 && response !== "") {
            setSuggestions([response]);
        }
        else {
            setSuggestions(_suggestions);
        }
    }

    useEffect(() => {
        responseToSuggestions();
    }, [response]);

    if (prompt === "" || prompt === undefined || prompt === null || prompt === " "){
        return (
            <div>
                <Modal>
                    <ModalBody>
                        <div>Enter an initial text for paraphrasing</div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    return (
        <div className="card" style={{backgroundColor:'rgb(86,88,105)', borderRadius:10}}>
            <div className="card-body">
                <button  className="btn btn-sm float-md-end text-white" onClick={toggleResponse}>generate suggestions</button>
                <h5 className="card-title text-white"><SiOpenai style={{backgroundColor:'#00A67E', color:'white',padding:2}}/> ChatGPT</h5>
                {isResponse && <h6 className="card-subtitle mb-3" style={{color:"lightgray"}}>Here are some relevant suggestions from chatGPT:</h6>}
                {suggestions.length < 1 ? (<p className="text-white">Loading...</p>) : (
                suggestions.map((suggestion, index) => (
                    <p className="badge rounded-pill bg-secondary" title="copy" onClick={() =>  navigator.clipboard.writeText(suggestion)}>{suggestion}</p>
                )))}
                {error ? <p className="text-danger">{error}</p> : null}
            </div>
        </div>
    );
}