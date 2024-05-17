import React, { useState } from "react";
import { useGlobalData } from "../store/globledata.js";
import "./../styles/Login.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { state, dispatch } = useGlobalData();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        dispatch({ type: "SET_USERNAME", payload: value });
        break;
      case "password":
        dispatch({ type: "SET_PASSWORD", payload: value });
        break;
      case "phone":
        dispatch({ type: "SET_PHONE", payload: value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("state"+ JSON.stringify(state));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    };

    try {
      const response = await fetch(
        "http://localhost:4000/usregister",
        requestOptions
      );
      if (response.ok) {
        navigate("/verify");
      } else {
        const data = await response.json();
        toast.warn(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="">
      <>
        <div className="grid ">
          <h3 className="p-3 text-center text-3xl mb-3">user register</h3>
          <form onSubmit={handleSubmit} className="form login">
            <div className="form__field">
              <label htmlFor="login__username">Username</label>
              <input
                id="login__username"
                type="text"
                name="username"
                value={state.username}
                onChange={handleInputChange}
                className="form__input"
                placeholder="Username"
                required=""
              />
            </div>
            <div className="form__field">
              <label htmlFor="login__password">Password</label>
              <input
                id="login__password"
                type="password"
                name="password"
                value={state.password}
                onChange={handleInputChange}
                className="form__input"
                placeholder="Password"
                required=""
              />
            </div>
            <div className="form__field">
              <label htmlFor="login__phone">Phone</label>
              <input
                id="login__phone"
                type="text"
                name="phone"
                value={state.phone}
                onChange={handleInputChange}
                className="form__input"
                placeholder="Phone number"
                required=""
              />
            </div>
            <div className="form__field">
              <input type="submit" defaultValue="Sign In" />
            </div>
          </form>
          <p className="text--center pt-3">
            forget password? <a href="#">click here</a>{" "}
            <svg className="icon">
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="assets/images/icons.svg#arrow-right"
              />
            </svg>
          </p>
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            <Link to="/userlogin">go to Login</Link>
          </button>
        </div>
      </>
    </div>
  );
};

export default Register;
