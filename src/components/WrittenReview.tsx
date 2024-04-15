import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import "./WrittenReview.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type Props = {};

const WrittenReview = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");
  const [review, setReview] = React.useState<string | null>("");

  let { id } = useParams();
  const navigate = useNavigate();

  const signedIn = useSelector((state: RootState) => state.auth.loggedIn);

  const redirectToLogin = () => {
    navigate(`/login`, { replace: true });
  };

  const PostWrittenReview = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/beans/${id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
          },
          credentials: "include",
          body: JSON.stringify({
            // TODO: ------- TO BE IMPLEMENTED:  aditional comment as review, eg: It was great! Nutty and light
            // "review": "5",
            // rating: p0,
            review,
          }),
        }
      );
      const data = await response.json();
      // TODO: add something to inform the user that review was created
      console.log("data", data);

      if (data.status === "success") {
        // alert("now is in review");
        setOpen(true);
        setSeverity("success");
        setAlertMessage("Review posted. Thank you!");

        setTimeout(() => {
          navigate(0);
        }, 1000);
      }
    } catch (error) {
      console.log("error", error);
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }
  };

  const PostButtonHandler = () => {
    signedIn ? PostWrittenReview() : redirectToLogin();
  };

  console.log("review", review);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div style={{ padding: "1rem" }}>
      {/* <h2>WrittenReview</h2> */}
      <Box className="boxStyling">
        <TextField
          id="outlined-multiline-static"
          label="What do you think about this coffee?"
          multiline
          rows={4}
          //   defaultValue="Default Value"
          style={{ width: "100%" }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setReview(event.target.value);
          }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => PostButtonHandler()}
        >
          Post
        </Button>
      </Box>
      <div className="snackbar">
        <Snackbar open={open} autoHideDuration={7000} onClose={handleClose}>
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

export default WrittenReview;
