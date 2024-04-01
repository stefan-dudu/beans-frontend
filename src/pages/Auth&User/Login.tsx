// Login.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { login } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

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
      console.log("after post", data);
      if (data.status === "success") {
        dispatch(login());
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

  return (
    <div>
      <div className="text">
        <h2>Sign in to your account</h2>
      </div>

      <div className="inputAndButton">
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
            setEmail(event.target.value);
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
        <p>Forgot your password?&nbsp;</p>
        <p onClick={() => navigate("/forgotpassword")}> Click&nbsp;here</p>
      </div>

      {/* <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" onClick={SubmitHandler}>
          Submit
        </Button>
        <h3>Forgot your password? Click</h3>
        <h3
          onClick={() => {
            navigate("/forgotpassword");
          }}
        >
          here
        </h3>
      </Form> */}
    </div>
  );
};

export default Login;
