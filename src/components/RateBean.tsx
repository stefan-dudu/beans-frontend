import React, { useState, useEffect } from "react";
import "./RateBean.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Rating from "@mui/material/Rating";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import { COLORS } from "../values/colors";

interface RatingProps {
  maxStars: number;
  currentRating: number | undefined;
  usersRating: number | null;
  ratingId: string | null;
}

const RateBean: React.FC<RatingProps> = ({ usersRating, ratingId }) => {
  const [value, setValue] = React.useState<number | null>(0);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");

  const signedIn = useSelector((state: RootState) => state.auth.loggedIn);

  const navigate = useNavigate();
  let { id } = useParams();

  const redirectToLogin = () => {
    navigate(`/login`);
  };
  const handleStarClick = (starIndex: number) => {
    signedIn ? PostRating(starIndex + 1) : redirectToLogin();
  };

  const PostRating = async (p0: number) => {
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
            rating: p0,
          }),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        console.log("new review created");
        setOpen(true);
        setSeverity("success");
        setAlertMessage("Review created");

        setTimeout(() => {
          navigate(0);
        }, 1000);
      }
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }
  };

  const UpdateReviewCall = async (rating: number) => {
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
            rating,
          }),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      // console.log("after post", data);
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
        // setOpen(true);
        // setSeverity("error");
        // setAlertMessage("There was an issue adding this bean.");
      }
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)
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

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: COLORS.darkGreen,
    },
    "& .MuiRating-iconHover": {
      color: COLORS.darkGreen,
    },
  });

  useEffect(() => {
    setValue(usersRating);
  }, [usersRating]);

  return (
    <div>
      <StyledRating
        name="simple-controlled"
        size="large"
        value={value}
        icon={<LocalCafeIcon fontSize="inherit" />}
        emptyIcon={<LocalCafeIcon fontSize="inherit" />}
        onChange={(event, newValue) => {
          if (newValue !== null && value !== null && value > 0) {
            // console.log("update func", newValue);
            UpdateReviewCall(newValue);
          } else if (value === 0 && newValue !== null) {
            // console.log("create new rating", newValue);
            handleStarClick(newValue - 1);
          }
        }}
      />
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

export default RateBean;
