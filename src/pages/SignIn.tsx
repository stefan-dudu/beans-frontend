import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AppDispatch, RootState } from "../store/store";
import { login } from "../store/auth/authSlice";
type Props = {};

const SignIn = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const signedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const dispatch = useDispatch<AppDispatch>();

  console.log("signedIn", signedIn);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const asyncPostCall = async () => {
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
      data.status === "success" && dispatch(login());
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }
  };

  const SubmitHandler = () => {
    //TODO:
    // e.preventDefault()
    asyncPostCall();
    console.log("handle");
  };

  return (
    <Form>
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
    </Form>
  );
};

export default SignIn;
