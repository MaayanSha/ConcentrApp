import React, {useRef, useState, useEffect, useContext} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./login.css";
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import { AuthContext } from './Authenticator';
import { useNavigate } from 'react-router-dom';

import { SIGNUP_URL } from "../../Constants";

export default function Signup(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const userRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setErrMsg("");
    }, [email, password]);
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                SIGNUP_URL,{email: email, username: username, password: password},
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            ).then(()=> {
                nav('/login');
            });
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Email, Username or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }
    };
    return(
        <>
                <section className="login-container">
                    <p className="login-error" ref={errRef}>
                        {errMsg}
                    </p>
                    <h2 className="login-header">Set up a new user</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p className="login-text" >Username</p>
                            <input className="login-input" type="text"
                                   id="username"
                                   autoComplete="off"
                                   onChange={(e) => setUsername(e.target.value)}
                                   value={username}
                                   required />
                        </label>
                        <label>
                            <p className="login-text" >Email</p>
                            <input className="login-input" type="text"
                                   id="email"
                                   ref={userRef}
                                   autoComplete="off"
                                   onChange={(e) => setEmail(e.target.value)}
                                   value={email}
                                   required />
                        </label>
                        <label>
                            <p className="login-text">Password</p>
                            <input className="login-input" type="password"
                                   id="password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   value={password}
                                   required />
                        </label>
                        <div>
                            <button  className="login-submit" type="submit">Submit</button>
                        </div>
                    </form>
                </section>
        </>
    );
}
