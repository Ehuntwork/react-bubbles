import React, { useState } from "react";
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const intialState = {
  credentials: {
    username: "",
    password: ""
  }
};

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [state, setState] = useState(intialState)
  const { push } = useHistory();

  const handleChange = e => {
    setState({
      credentials: {
      ...state.credentials,
      [e.target.name]: e.target.value
      }
      
  });
  };

  const onSubmit = e => {
      e.preventDefault();
      axios
        .post("http://localhost:5000/api/login", state.credentials)
        .then(res => {
          console.log(res)
          localStorage.setItem("token", res.data.payload);
          push("/BubblePage");
        })
        .catch(err => console.log(err));
    };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={onSubmit}>
          <input
              type="text"
              name="username"
              value={state.credentials.username}
              onChange={handleChange}
          />
          <input
              type="password"
              name="password"
              value={state.credentials.password}
              onChange={handleChange}
          />
          <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
