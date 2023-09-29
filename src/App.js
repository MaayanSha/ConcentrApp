import React, { Component, Fragment, useContext, useEffect, useNavigate } from "react";
import Home from "./Components/ResearchHome/Home.js";
import ExperimentLandingPage from "./Components/Experiment/ExperimentLandingPage"
import Survey from "./Components/Experiment/Survey/Survey"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios";
import { API_URL } from "./Constants";
import Login from "./Components/Login/Login"
import {AuthContext} from "./Components/Login/Authenticator"
import cookie from "js-cookie";
import ManageStudents from "./Components/Experiment/Students/ManageStudents";
import ViewCollectedData from "./Components/Experiment/CollectedData/ViewCollectedData";
import About from "./Miscellaneous/About";
import Signup from "./Components/Login/Signup";
//import ErrorBoundary from "./ErrorHandling/ErrorBoundary";
import { ErrorBoundary } from 'react-error-boundary'
import FallbackScreen from "./ErrorHandling/FallbackScreen";

  const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
    return isLoggedIn ? children : <Login />;
    };

class App extends Component {

  static contextType = AuthContext;

  state = {
    researches: [],
  };


  getResearches = () => {
    axios.get(API_URL+"experiments/", {
      headers: {
        'Authorization': `Bearer ${cookie.get('jwt-authorization')}`
      }
    }).then(res => {this.setState({ researches: Array.from(res.data.data)})}).catch((error) => {
      console.error("Error fetching researches:", error?.response?.data?.error ?
          error.response.data.error
          : error.message);
    });
  };
  resetState = () => {
    this.getResearches();
  };

  render() {
    return (
    <div className="App">
      <ErrorBoundary FallbackComponent={FallbackScreen} resetKeys={[this.state.researches]}>
      <Routes>
      <Route exact path="/" element={
        <PrivateRoute>
          <Home key="home" researches={this.state.researches} resetState={this.resetState} />
        </PrivateRoute>} />
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/signup" element={<Signup />}/>
        <Route path="/home" element={
        <PrivateRoute>
          <Home key="home" researches={this.state.researches} resetState={this.resetState} />
        </PrivateRoute>} />
        <Route path='/data/:id' element={
        <PrivateRoute>
          <ExperimentLandingPage key="exp" researches={this.state.researches} />
        </PrivateRoute>} />
        <Route path="/data/:id/edit" element={
        <PrivateRoute>
          <Survey key="surv" />
        </PrivateRoute>} />
      <Route path="/data/:id/students" element={
        <PrivateRoute>
          <ManageStudents />
        </PrivateRoute>} />
        <Route path="/data/:id/submissions" element={
          <PrivateRoute>
            <ViewCollectedData />
          </PrivateRoute>} />
        <Route path="/about" element={<About />} />
    </Routes>
      </ErrorBoundary>
     </div>
  );
}
}
export default App;