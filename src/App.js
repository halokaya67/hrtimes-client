<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";
//import { Switch, Route } from "react-router-dom";

function App() {
  return <div className="App">Hello</div>;
=======
import React, {useState, useEffect} from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from 'axios';
import HomePage from "./components/HomePage/HomePage";
import SignIn from "./components/SignIn/SignIn";
import { API_URL } from './config';

function App(props) {
  const { user, updateUser } = useState(null);
  const {myError, updateError } = useState(null);

  const handleSignIn = async (event) => {
    event.preventDefault();

    const { email, password } = event.target;

    let myUser = {
      email: email.value,
      password: password.value,
    }

    try {
      let response = await axios.post(`${API_URL}/api/signin`, myUser, { withCredentials: true })
      
      updateUser(response.data);
      props.history.push("/profile");
    } catch (error) {
      updateError(error);
    }
  }
=======
import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import SignUp from "./components/signup/SignUp";
import axios from "axios";

function App(props) {
  const { user, updateUser, newUser } = useState(null);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const {
      username,
      firstName,
      lastName,
      email,
      passwordHash,
      country,
      city,
    } = event.target;

    let newUser = {
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      country: country.value,
      city: city.value,
      passwordHash: passwordHash.value,
    };

    try {
      await axios.post(`http://localhost:5005/api/signup`, newUser);
      props.history.push("/");
    } catch (err) {
      console.log("Signup failed", err);
    }
  };
>>>>>>> c4503f4162332be515e5f72fa5577628ca06c8cc

  return (
    <div className="App">
      <Switch>
        <Route path="/signin" render={(routerProps) => {
          return <SignIn error={myError} onSignIn={handleSignIn} {...routerProps}/>
        }}/>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/signup"
          render={(routeProps) => {
            return <SignUp onSignUp={handleSignUp} {...routeProps} />;
          }}
        />
      </Switch>
    </div>
  );
>>>>>>> 4775f01087c0c2076d71130bc4c23997e5202d9c
}

<<<<<<< HEAD
export default withRouter(App);
=======
export default withRouter(App);
>>>>>>> c4503f4162332be515e5f72fa5577628ca06c8cc
