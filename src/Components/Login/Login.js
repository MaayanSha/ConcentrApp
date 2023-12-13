import React, {useRef, useState, useEffect, useContext} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./login.css";
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import { AuthContext } from './Authenticator';
import {Link, useNavigate} from 'react-router-dom';

import { LOGIN_URL } from "../../Constants/index.js";

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const userRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const [user, setUser] = useState("");
    const { isLoggedIn, login, logout } = useContext(AuthContext);

    useEffect(() => {
    setErrMsg("");
    }, [email, password]);
    const nav = useNavigate();

    const handleLogout = () => {
        logout();
        nav('/login');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
            LOGIN_URL,
            JSON.stringify({ email, password }),
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
            setEmail(email);
            setPassword(password);
          const accessToken = response?.data?.token.access;
          const user = email.split("@")[0];
          login(accessToken,user);
          nav('/home');
        } catch (err) {
          if (!err?.response) {
            setErrMsg("No Server Response");
          } else if (err.response?.status === 400) {
            setErrMsg("Missing Username or Password");
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
    {isLoggedIn ? (
    <section>
          <p>hi</p>
      </section>    ) : (
      <section className="login-container">
    <p className="login-error" ref={errRef}>
        {errMsg}
          </p>
          <h2 className="login-header">Please Log In</h2>
          <form onSubmit={handleSubmit}>
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
          <div className="login-text" style={{marginTop:15}}>
          <Link to={`/signup`}>Create a new user</Link>
          </div>
        </section>
        )}
      </>
    );
}
