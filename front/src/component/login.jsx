import React, { useState } from "react";
import { useGlobalData } from "../store/globledata.js"; // Assuming GlobalDataContext file path
import "./../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
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
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    };

    try {
      const response = await fetch(
        "http://localhost:4000/userlogin",
        requestOptions
      );
      if (response.ok) {
        navigate("/home");
      } else {
        const data = await response.json();
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message)
      
    }
  };

  return (
    <div className="">
      <>
        <div className="grid ">
          <h3 className="p-3 text-center text-3xl mb-3">User Login</h3>
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
            <Link to="/useregister">go to Register</Link>
          </button>
          <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-3">
            <Link to="/adminlogin">go to Adminlogin</Link>
          </button>
        </div>
      </>
    </div>
  );
};

export default Login;
