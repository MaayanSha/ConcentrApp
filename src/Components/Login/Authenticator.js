import React, { createContext, useState, useEffect } from 'react';
import cookie from 'js-cookie';
import jwt_decode from "jwt-decode";
import bcrypt from "bcryptjs-react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = cookie.get('jwt-authorization');
    if (token) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const login = (jwt_token, user) => {
  // set the authentication token in a cookie
    //hash the token so it wouldn't be exposed in the browser
    //const hashedToken = bcrypt.hashSync(jwt_token, 10);
    cookie.set('jwt-authorization', jwt_token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // set the cookie to expire in 1 day
    });
    setIsLoggedIn(true);
    setUser(user);
    };

  const logout = () => {
    cookie.remove('jwt-authorization');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
