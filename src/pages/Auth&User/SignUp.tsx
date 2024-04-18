import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { login } from "../../store/auth/authSlice";
import "./SignUp.scss";
import logo from "../../assets/logo2.png";

type Props = {};

const SignUp = (props: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignupCall = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      // console.log("after post", data);
      if (data.status === "success") {
        // TODO: might have to do it
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

  const submitHandler = () => {
    SignupCall();
  };

  const redirectToLogin = () => {
    navigate(`/login`, { replace: true });
  };
  return (
    <div className="pageWrapper ">
      {/* TODO: Tems of service and privacy */}
      {/* <h3>
            By signing in, you agree to the Baristretto Terms of Service and
            Privacy Policy
          </h3> */}
      {/* <Button variant="primary" onClick={() => submitHandler()}>
            Submit
          </Button> */}

      <div className="text">
        <div>Sign in or create an account</div>
        {/* <div>Join us and be part of the community</div> */}
      </div>
      <div className="inputAndButton">
        <img
          src={logo}
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        <TextField
          sx={{ m: 1, width: "25ch" }}
          id="outlined-basic"
          variant="outlined"
          label="Your name"
          color="success"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
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
            submitHandler();
          }}
        >
          Create account
        </Button>
      </div>

      <div className="loginDiv">
        <div>Already part of the community?&nbsp;</div>
        <div onClick={() => redirectToLogin()} className="link">
          {" "}
          Click&nbsp;here
        </div>
      </div>
    </div>
  );
};

export default SignUp;
