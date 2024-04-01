import React, { useState } from "react";
import "./RateBean.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface RatingProps {
  maxStars: number;
  currentRating: number | undefined;
}

const RateBean: React.FC<RatingProps> = ({ maxStars, currentRating }) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const signedIn = useSelector((state: RootState) => state.auth.loggedIn);

  const navigate = useNavigate();
  let { id } = useParams();

  // console.log("currentRating", currentRating);

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
      data.status === "success" && navigate(0);
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }
  };

  const handleStarClick = (starIndex: number) => {
    signedIn ? PostRating(starIndex + 1) : redirectToLogin();
  };

  const handleStarHover = (starIndex: number) => {
    setHoveredStar(starIndex);
  };

  const handleStarLeave = () => {
    setHoveredStar(null);
  };

  return (
    <div className="rating">
      {Array.from({ length: maxStars }, (_, index) => index).map((index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => handleStarHover(index)}
          onMouseLeave={handleStarLeave}
          className={
            index <=
            (hoveredStar !== null
              ? hoveredStar
              : currentRating !== undefined
              ? currentRating - 1
              : -1)
              ? "star active"
              : "star"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RateBean;
