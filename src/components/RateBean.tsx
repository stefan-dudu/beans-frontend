import React, { useState, useEffect } from "react";
import "./RateBean.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Rating from "@mui/material/Rating";

interface RatingProps {
  maxStars: number;
  currentRating: number | undefined;
}

const RateBean: React.FC<RatingProps> = ({ maxStars, currentRating }) => {
  const [value, setValue] = React.useState<number | null>(0);
  const [ratingId, setRatingId] = React.useState<string | null>("");

  const signedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const userId = useSelector((state: RootState) => state.auth.id);

  const navigate = useNavigate();
  let { id } = useParams();
  // console.log("bean id", id);
  // console.log("id", userId);
  // console.log("currentRating", currentRating);
  // console.log("value", value);

  const redirectToLogin = () => {
    navigate(`/login`, { replace: true });
  };

  // console.log("signedIn", signedIn);

  // TODO:
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
            // TODO: ------- TO BE IMPLEMENTED:  aditional comment as review, eg: It was great! Nutty and light
            // "review": "5",
            rating: p0,
          }),
        }
      );
      const data = await response.json();
      // TODO: add something to inform the user that review was created
      data.status === "success" && setValue(p0);
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }
  };

  const handleStarClick = (starIndex: number) => {
    signedIn ? PostRating(starIndex + 1) : redirectToLogin();
  };

  const fetchUsersRatingForBean = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/reviews/${id}/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // TODO: ESSENTIAL FOR jwt
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const { data } = await response.json();
      // data && setValue(data?.review[data?.review.length - 1].rating);
      // console.log("data", data && data?.review[data?.review.length - 1].rating);
      // setData(data.data);
      // console.log("data", data);
      // setError(null);
      if (data && data.review.length > 0) {
        setValue(data.review[data.review.length - 1].rating);
        setRatingId(data.review[data.review.length - 1].id);
      }
    } catch (err: any) {
      // setError(err);
    } finally {
      // setLoading(false);
      // dispatch(notLoading());
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
      console.log("after post", data);
      if (data.status === "success") {
        console.log("udpated, all good");
        setValue(rating);
        // navigate(0);
        // TODO: maybe prevent reload and just inform the user it been successfull
        // setOpen(true);
        // setSeverity("success");
        // setAlertMessage("The new coffee bean has been sent to review");
        // setTimeout(() => {
        //   navigate("/");
        // }, 2000);
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

  useEffect(() => {
    fetchUsersRatingForBean();

    // console.log("use efff ran");
  }, [value]);

  // console.log("value", value);

  return (
    <Rating
      name="simple-controlled"
      size="large"
      value={value}
      onChange={(event, newValue) => {
        if (newValue !== null && value !== null && value > 0) {
          console.log("update func", newValue);
          UpdateReviewCall(newValue);
        } else if (value === 0 && newValue !== null) {
          console.log("create new rating", newValue);
          handleStarClick(newValue - 1);
        }
      }}
    />
  );
};

export default RateBean;
