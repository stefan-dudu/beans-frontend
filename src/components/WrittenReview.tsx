import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import "./WrittenReview.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { COLORS } from ".././values/colors";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";

type Props = {
  usersRating: number | null;
  reviewText: string | null;
  ratingId: string | null;
};

const WrittenReview = ({ usersRating, reviewText, ratingId }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [ratingValue, setRatingValue] = React.useState<number | null>(0);
  const [review, setReview] = React.useState<string | null>("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");

  let { id } = useParams();
  const navigate = useNavigate();

  const signedIn = useSelector((state: RootState) => state.auth.loggedIn);

  const redirectToLogin = () => {
    navigate(`/login`, { replace: true });
  };

  const PostReview = async () => {
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
            review,
            rating: ratingValue,
          }),
        }
      );
      const data = await response.json();
      console.log("data", data);

      if (data.status === "success") {
        console.log("new review created");
        setOpen(true);
        setSeverity("success");
        setAlertMessage("Review posted. Thank you!");

        setTimeout(() => {
          navigate(0);
        }, 1000);
      }

      if (data.status === "error") {
        setOpen(true);
        setSeverity("error");
        setAlertMessage("A review needs to have also a rating");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const UpdateReview = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/reviews/${ratingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            review,
            rating: ratingValue,
          }),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        console.log("new review created");
        setOpen(true);
        setSeverity("success");
        setAlertMessage("Review updated");

        setTimeout(() => {
          navigate(0);
        }, 1000);
      }

      if (data.status === "error") {
        console.log("error mate");
        setOpen(true);
        setSeverity("error");
        setAlertMessage("There was an error");
      }
    } catch (error) {
      console.log(error);
    }
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

  const handleCreateNewReview = () => {
    signedIn ? PostReview() : redirectToLogin();
  };

  const handleUpdateExistingReview = () => {
    signedIn ? UpdateReview() : redirectToLogin();
  };

  useEffect(() => {
    setRatingValue(usersRating);
    setReview(reviewText);
  }, [usersRating, reviewText]);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: COLORS.darkGreen,
    },
    "& .MuiRating-iconHover": {
      color: COLORS.darkGreen,
    },
  });

  return (
    <div className="written-reviews-wrapper">
      {/* <h2>WrittenReview</h2> */}
      <Box className="boxStyling">
        {usersRating === 0 && (
          <div className="add-rating-CTA">
            What do you think about this coffee?
          </div>
        )}

        <StyledRating
          name="simple-controlled"
          size="large"
          icon={<LocalCafeIcon fontSize="inherit" />}
          emptyIcon={<LocalCafeIcon fontSize="inherit" />}
          value={ratingValue}
          onChange={(event, newValue) => {
            setRatingValue(newValue !== null ? newValue * 1 : 0);
          }}
        />
        <TextField
          id="outlined-multiline-static"
          // label="Your opinion"
          multiline
          rows={4}
          value={review}
          style={{ width: "100%" }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setReview(event.target.value);
          }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            if (!usersRating) {
              // console.log("no value > will create new review");
              handleCreateNewReview();
            } else if (usersRating) {
              // console.log("there is a rating >> will update");
              handleUpdateExistingReview();
            }
          }}
        >
          {usersRating === 0 ? "Post" : "Update"}
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
