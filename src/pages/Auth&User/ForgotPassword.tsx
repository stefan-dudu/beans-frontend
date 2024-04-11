import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { notLoading, isLoading } from "../../store/navBar/NavBarSlice";
import { AppDispatch, RootState } from "../../store/store";
import "./ForgotPassword.scss";

type Props = {};

const ForgotPassword = (props: Props) => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const loadingData = useSelector(
    (state: RootState) => state.navBar.loadingData
  );

  const ForgotPasswordCall = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/users/forgotPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
          }),
        }
      );
      const data = await response.json();
      // console.log("after post", data);
      if (data.status === "success") {
        // TODO: might have to do it
        // dispatch(login());
        // localStorage.setItem("token", data.token); // Store token in local storage
        // navigate(-1);
        setOpen(true);
        setSeverity("success");
        setAlertMessage("The reset token has been sent successfully");
      }

      if (data.status === "error") {
        // TODO: might have to do it
        // dispatch(login());
        // localStorage.setItem("token", data.token); // Store token in local storage
        // navigate(-1);
        setOpen(true);
        setSeverity("error");
        setAlertMessage(
          "There was an issue sending the email token. Are you sure this is the right email address?"
        );
      }
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    } finally {
      dispatch(notLoading());
    }
  };

  const buttonHandler = () => {
    ForgotPasswordCall();
    dispatch(isLoading());
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // console.log("email", email);

  return (
    <div className="resetPassWrapper">
      {/* ForgotPassword */}
      {/* TODO: Captch to add */}
      {/* <h3>Captch to add</h3> */}
      <div className="text">
        <div>Forgot password</div>
        <p>
          Just need to confirm the email address to send you instructions to
          reset the password
        </p>
      </div>
      <div className="inputAndButton">
        <TextField
          color="success"
          id="standard-basic"
          label="Email"
          variant="standard"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />
        <Button
          color="success"
          variant="contained"
          onClick={() => {
            buttonHandler();
          }}
        >
          Reset password
        </Button>
      </div>
      <div className="snackbar">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ForgotPassword;
