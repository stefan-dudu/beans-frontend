import React, { useState } from "react";
import "./RateBean.scss";
import { useParams } from "react-router-dom";

interface RatingProps {
  maxStars: number;
}

const RateBean: React.FC<RatingProps> = ({ maxStars }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  // const { id } = useParams<{ id: string }>();
  // console.log("---id", id);
  console.log("process.env", process.env.URL);

  // TODO:
  const asyncPostCall = async () => {
    try {
      const response = await fetch(
        `https://127.0.0.1:5001/api/v1/beans/65f1be274bf681601179096f/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
          },
          body: JSON.stringify({
            // TODO: ------- TO BE IMPLEMENTED
            // "review": "5",
            rating: rating,
          }),
        }
      );
      const data = await response.json();
      // enter you logic when the fetch is successful
      console.log("after post", data);
    } catch (error) {
      // enter your logic for when there is an error (ex. error toast)

      console.log(error);
    }
  };

  const handleStarClick = (starIndex: number) => {
    // TODO:
    // asyncPostCall();
    setRating(starIndex + 1);
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
            index <= (hoveredStar !== null ? hoveredStar : rating - 1)
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
