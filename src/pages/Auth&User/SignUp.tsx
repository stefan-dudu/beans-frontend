import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { login } from "../../store/auth/authSlice";
import "./SignUp.scss";

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
      console.log("after post", data);
      if (data.status === "success") {
        // TODO: might have to do it
        dispatch(login());
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
    <div>
      <div className="SignUpForm">
        <Form>
          <Form.Group className="mb-3" controlId="todo">
            <Form.Label>Your name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Normal text"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" onClick={() => submitHandler()}>
            Submit
          </Button>
        </Form>
      </div>
      <div className="loginDiv">
        <p>Already part of the community? Click &nbsp;</p>
        <p onClick={() => redirectToLogin()}>here</p>
      </div>
    </div>
  );
};

export default SignUp;
