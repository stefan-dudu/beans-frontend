// Login.tsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { login } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.webp";

import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginCall = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      // console.log("data", data?.data);
      // console.log("after post", data?.data.user.role);
      if (data.status === "success") {
        dispatch(
          login({
            role: String(data?.data.user.role),
            id: String(data?.data.user._id),
          })
        );

        localStorage.setItem("token", data.token); // Store token in local storage
        navigate(-1);
      }
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
      console.log(error);
    }
  };

  const SubmitHandler = () => {
    loginCall();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pageWrapper ">
      <div className="text">
        <div>Sign in to your account</div>
      </div>

      <div className="inputAndButton">
        <img
          src={logo}
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="Our website logo"
          loading="lazy"
          title="Coffee reviews logo"
        />
        <TextField
          sx={{ m: 1, width: "25ch" }}
          color="success"
          id="outlined-basic"
          variant="outlined"
          label="Email"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          sx={{ m: 1, width: "25ch" }}
          color="success"
          id="outlined-password-input"
          label="Password"
          variant="outlined"
          type="password"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />
        <Button
          color="success"
          variant="contained"
          onClick={() => {
            SubmitHandler();
          }}
        >
          Sign in
        </Button>
      </div>
      <div className="loginDiv">
        <div>Not a memebr yet?&nbsp;</div>
        <div onClick={() => navigate("/signup")} className="link">
          {" "}
          Join us&nbsp;here
        </div>
      </div>
      <div className="loginDiv" style={{ marginTop: "1rem" }}>
        <div>Forgot your password?&nbsp;</div>
        <div onClick={() => navigate("/forgotpassword")} className="link">
          {" "}
          Click&nbsp;here
        </div>
      </div>
    </div>
  );
};

export default Login;
