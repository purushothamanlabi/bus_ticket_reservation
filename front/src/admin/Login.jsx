import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    if (username === "admin456" && password === "pscode1") {
      // Login successful, navigate to dashboard
      navigate("/dashboard");
    } else if (username !== "admin456") {
      // Incorrect username, show error message
      toast.error("No user found");
    } else {
      // Incorrect password, show error message
      toast.error("Incorrect password");
    }
  };

  return (
    <div className="body">
      <>
        <div className="grids justify-center items-center">
        <h3 className="p-3 text-center text-3xl mb-3">Admin Login</h3>

          <form className="form login" onSubmit={handleSubmit}>
            <div className="form__field">
              <label htmlFor="login__username">
                <svg className="icon">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#user"
                  />
                </svg>
                <span className="hidden">Username</span>
              </label>
              <input
                id="login__username"
                type="text"
                name="username"
                className="form__input"
                placeholder="Username"
                required=""
              />
            </div>
            <div className="form__field">
              <label htmlFor="login__password">
                <svg className="icon">
                  <use
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref="#lock"
                  />
                </svg>
                <span className="hidden">Password</span>
              </label>
              <input
                id="login__password"
                type="password"
                name="password"
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
            Forget password? <a href="#">Click here</a>{" "}
            <svg className="icon">
              <use
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref="assets/images/icons.svg#arrow-right"
              />
            </svg>
          </p>
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full">
    <Link to='/userlogin'>Go to user login</Link>
</button>

        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="icons">
          {/* Define your symbols here */}
        </svg>
        {/* partial */} <Link></Link>
      </>
    </div>
  );
};

export default Login;
